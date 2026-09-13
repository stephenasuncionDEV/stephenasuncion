"use client";

import { useEffect, useId, useRef, useState } from "react";

import {
  PORTRAIT_DESKTOP,
  PORTRAIT_HEIGHT,
  PORTRAIT_TONES,
  PORTRAIT_WIDTH,
} from "./portrait-data";

type LivingCodeProps = {
  paused?: boolean;
  motifKey?: number;
  className?: string;
};

const GLYPHS = [" ", "·", ".", ":", "+", "*", "#", "%", "@", "@"];
const FONT_SIZE = 5.42;
const PORTRAIT_OPACITY = 0.84;
const STATIC_ROWS = [false, true].map((dark) =>
  PORTRAIT_DESKTOP.map((row) =>
    Array.from(row)
      .map((code) => {
        const value = PORTRAIT_TONES.indexOf(code);
        if (value < 0) return " ";
        const density = dark ? value / 63 : 1 - value / 63;
        return GLYPHS[
          Math.min(GLYPHS.length - 1, Math.floor(density ** 1.6 * 10))
        ];
      })
      .join(""),
  ),
);

export function LivingCode({
  paused = false,
  motifKey = 0,
  className = "",
}: LivingCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const lastMotifRef = useRef(motifKey);
  const syncRef = useRef<() => void>();
  const rippleRef = useRef<() => void>();
  const [ready, setReady] = useState(false);
  const maskId = `portrait-${useId().replace(/:/g, "")}`;

  // Keep animation playback in sync with the pause control.
  useEffect(() => {
    pausedRef.current = paused;
    syncRef.current?.();
  }, [paused]);

  // Start a gentle ripple when requested.
  useEffect(() => {
    if (lastMotifRef.current !== motifKey) {
      lastMotifRef.current = motifKey;
      rippleRef.current?.();
    }
  }, [motifKey]);

  // Animate the initial SVG artwork while respecting visibility and motion preferences.
  useEffect(() => {
    const container = containerRef.current;
    const fallback = fallbackRef.current;
    const canvas = canvasRef.current;
    if (!container || !fallback || !canvas) return;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const finePointer = window.matchMedia("(pointer: fine)");
    let reducedMotion = motionPreference.matches;
    let visible = true;
    let disposed = false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let mobile = false;
    let frame = 0;
    let lastFrame = 0;
    let time = 0;
    let scroll = 0;
    let targetScroll = 0;
    let rippleStart = -10;
    let texture: HTMLCanvasElement | null = null;
    let textureKey = "";
    let pendingImage: HTMLImageElement | null = null;
    let pendingUrl: string | null = null;
    let generation = 0;
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      targetStrength: 0,
    };

    const geometry = () => {
      const scale =
        Math.min(width / PORTRAIT_WIDTH, height / PORTRAIT_HEIGHT) * 0.96;
      const portraitWidth = PORTRAIT_WIDTH * scale;
      const portraitHeight = PORTRAIT_HEIGHT * scale;
      return {
        width: portraitWidth,
        height: portraitHeight,
        left: (width - portraitWidth) / 2,
        top: (height - portraitHeight) / 2,
      };
    };

    const render = () => {
      if (!texture || !width || !height || disposed) return;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      const portrait = geometry();
      const rippleAge = time - rippleStart;
      const rows = PORTRAIT_DESKTOP.length;
      for (let row = 0; row < rows; row++) {
        const position = (row + 0.5) / rows;
        const sourceY = Math.round((row * texture.height) / rows);
        const sourceHeight =
          Math.round(((row + 1) * texture.height) / rows) - sourceY;
        const y = portrait.top + position * portrait.height;
        const depth = Math.sin(position * Math.PI);
        let displacement =
          (Math.sin(time * 0.42 + position * 7) - Math.sin(position * 7)) *
          depth *
          0.5;
        displacement += scroll * depth * 1.2;
        const verticalDistance = (y - pointer.y) / (portrait.height * 0.16);
        const horizontalInfluence = Math.max(
          0,
          1 - Math.abs(pointer.x - width / 2) / (portrait.width * 0.65),
        );
        displacement +=
          Math.exp(-verticalDistance * verticalDistance * 2) *
          horizontalInfluence *
          pointer.strength *
          ((pointer.x - width / 2) / portrait.width) *
          6;
        if (rippleAge >= 0 && rippleAge < 2.7) {
          const distance = Math.abs(position - 0.42);
          const wave = Math.exp(-((distance - rippleAge * 0.31) ** 2) / 0.004);
          displacement += wave * Math.sin(rippleAge * 8 - distance * 13) * 2.5;
        }
        context.drawImage(
          texture,
          0,
          sourceY,
          texture.width,
          sourceHeight,
          Math.round((portrait.left + displacement) * dpr),
          Math.round(portrait.top * dpr) + sourceY,
          texture.width,
          sourceHeight,
        );
      }
    };

    const canAnimate = () =>
      !disposed &&
      !!texture &&
      !reducedMotion &&
      !pausedRef.current &&
      visible &&
      !document.hidden;
    const tick = (now: number) => {
      frame = 0;
      if (!canAnimate()) return;
      const interval = mobile ? 1000 / 24 : 1000 / 30;
      if (!lastFrame || now - lastFrame >= interval - 0.5) {
        const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.07) : 0;
        lastFrame = now;
        time += delta;
        const ease = 1 - Math.exp(-delta * 7);
        pointer.x += (pointer.targetX - pointer.x) * ease;
        pointer.y += (pointer.targetY - pointer.y) * ease;
        pointer.strength += (pointer.targetStrength - pointer.strength) * ease;
        scroll += (targetScroll - scroll) * ease;
        render();
      }
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      if (canAnimate()) {
        if (!frame) {
          lastFrame = 0;
          frame = requestAnimationFrame(tick);
        }
      } else {
        cancelAnimationFrame(frame);
        frame = 0;
        lastFrame = 0;
      }
    };

    const releaseImage = () => {
      if (pendingImage) {
        pendingImage.onload = null;
        pendingImage.onerror = null;
      }
      if (pendingUrl) URL.revokeObjectURL(pendingUrl);
      pendingImage = null;
      pendingUrl = null;
    };
    const buildTexture = () => {
      if (disposed || !width || !height) return;
      const portrait = geometry();
      const pixelWidth = Math.max(1, Math.round(portrait.width * dpr));
      const pixelHeight = Math.max(1, Math.round(portrait.height * dpr));
      const ink =
        getComputedStyle(container).getPropertyValue("--ink").trim() ||
        "#26251f";
      const dark = document.documentElement.classList.contains("dark");
      const key = `${pixelWidth}:${pixelHeight}:${ink}:${dark}`;
      if (textureKey === key) return;
      textureKey = key;
      generation += 1;
      const version = generation;
      releaseImage();
      texture = null;
      setReady(false);
      sync();
      const artwork = fallback.cloneNode(true) as SVGSVGElement;
      artwork.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      artwork.setAttribute("width", String(pixelWidth));
      artwork.setAttribute("height", String(pixelHeight));
      artwork.style.cssText = `color: ${ink};`;
      artwork
        .querySelector(
          dark ? ".living-code__static-light" : ".living-code__static-dark",
        )
        ?.remove();
      const source = new XMLSerializer().serializeToString(artwork);
      const url = URL.createObjectURL(
        new Blob([source], { type: "image/svg+xml;charset=utf-8" }),
      );
      const image = new window.Image();
      pendingUrl = url;
      pendingImage = image;
      image.onload = () => {
        if (disposed || version !== generation) return;
        const nextTexture = document.createElement("canvas");
        nextTexture.width = pixelWidth;
        nextTexture.height = pixelHeight;
        const ctx = nextTexture.getContext("2d");
        if (ctx) {
          ctx.drawImage(image, 0, 0, pixelWidth, pixelHeight);
          texture = nextTexture;
          render();
          setReady(true);
          sync();
        }
        releaseImage();
      };
      image.onerror = () => {
        if (version === generation) {
          textureKey = "";
          releaseImage();
        }
      };
      image.src = url;
    };
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      mobile = width < 500;
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      buildTexture();
      render();
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion || pausedRef.current) return;
      const rect = container.getBoundingClientRect();
      pointer.targetX = event.clientX - rect.left;
      pointer.targetY = event.clientY - rect.top;
      pointer.targetStrength = 1;
    };
    const onPointerLeave = () => {
      pointer.targetStrength = 0;
    };
    const onScroll = () => {
      if (!visible || reducedMotion) return;
      targetScroll = Math.max(
        -1,
        Math.min(
          1,
          -container.getBoundingClientRect().top / window.innerHeight,
        ),
      );
    };
    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        pointer.strength =
          pointer.targetStrength =
          scroll =
          targetScroll =
          time =
            0;
        rippleStart = -10;
        render();
      }
      sync();
    };
    syncRef.current = sync;
    rippleRef.current = () => {
      if (reducedMotion || pausedRef.current) return;
      rippleStart = time;
      sync();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(container);
    const themeObserver = new MutationObserver(buildTexture);
    let ancestor: HTMLElement | null = container;
    while (ancestor) {
      themeObserver.observe(ancestor, {
        attributes: true,
        attributeFilter: ["class", "style", "data-theme", "data-accent"],
      });
      ancestor = ancestor.parentElement;
    }
    container.addEventListener("pointermove", onPointerMove, { passive: true });
    container.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", sync);
    motionPreference.addEventListener("change", onMotionChange);
    return () => {
      disposed = true;
      generation += 1;
      releaseImage();
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", sync);
      motionPreference.removeEventListener("change", onMotionChange);
      syncRef.current = undefined;
      rippleRef.current = undefined;
    };
  }, []);
  return (
    <div
      ref={containerRef}
      className={`living-code ${className}`.trim()}
      role="img"
      aria-label="Stephen Asuncion’s portrait, drawn in tiny living characters"
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <svg
        ref={fallbackRef}
        className="living-code__fallback"
        viewBox={`0 0 ${PORTRAIT_WIDTH} ${PORTRAIT_HEIGHT}`}
        aria-hidden="true"
        focusable="false"
        style={{
          position: "absolute",
          inset: "2%",
          width: "96%",
          height: "96%",
          opacity: ready ? 0 : 1,
          color: "var(--ink, #26251f)",
        }}
      >
        <defs>
          <linearGradient id={`${maskId}-fade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="86%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <mask id={maskId}>
            <rect
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              fill={`url(#${maskId}-fade)`}
            />
          </mask>
        </defs>
        <g
          mask={`url(#${maskId})`}
          fill="currentColor"
          fontFamily="Courier New, monospace"
          fontWeight="700"
          fontSize={FONT_SIZE}
          opacity={PORTRAIT_OPACITY}
        >
          {[false, true].map((dark) => (
            <g
              key={String(dark)}
              className={
                dark ? "living-code__static-dark" : "living-code__static-light"
              }
            >
              {STATIC_ROWS[dark ? 1 : 0].map((row, index) => (
                <text
                  key={index}
                  x="0"
                  y={
                    ((index + 0.84) * PORTRAIT_HEIGHT) / PORTRAIT_DESKTOP.length
                  }
                  textLength={PORTRAIT_WIDTH}
                  lengthAdjust="spacingAndGlyphs"
                  xmlSpace="preserve"
                  style={{ whiteSpace: "pre" }}
                >
                  {row}
                </text>
              ))}
            </g>
          ))}
        </g>
      </svg>
      <canvas
        ref={canvasRef}
        className="living-code__canvas"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: ready ? 1 : 0,
        }}
      />
    </div>
  );
}

export default LivingCode;
