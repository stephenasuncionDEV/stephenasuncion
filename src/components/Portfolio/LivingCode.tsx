"use client";

import { useEffect, useId, useRef, useState } from "react";

import {
  PORTRAIT_DESKTOP,
  PORTRAIT_HEIGHT,
  PORTRAIT_MOBILE,
  PORTRAIT_TONES,
  PORTRAIT_WIDTH,
} from "./portrait-data";

type LivingCodeProps = {
  paused?: boolean;
  motifKey?: number;
  className?: string;
};

type PortraitPoint = {
  x: number;
  y: number;
  tone: number;
  alpha: number;
  seed: number;
  edge: boolean;
};

const GLYPHS = ["·", ".", ":", "-", "=", "+", "*", "#", "%", "@"];
const STATIC_GLYPHS = [" ", "·", ".", ":", "+", "*", "#", "%", "@", "@"];
const STATIC_ROWS = [false, true].map((dark) =>
  PORTRAIT_DESKTOP.map((row) =>
    Array.from(row)
      .map((code) => {
        const value = PORTRAIT_TONES.indexOf(code);
        if (value < 0) return " ";
        const density = dark ? value / 63 : 1 - value / 63;
        return STATIC_GLYPHS[
          Math.min(STATIC_GLYPHS.length - 1, Math.floor(density ** 1.6 * 10))
        ];
      })
      .join(""),
  ),
);

const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));
const smoothstep = (value: number) => {
  const unit = clamp(value);
  return unit * unit * (3 - 2 * unit);
};

export function LivingCode({
  paused = false,
  motifKey = 0,
  className = "",
}: LivingCodeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

  // Render the portrait and manage interaction, visibility, and motion preferences.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
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
    let columns = 112;
    let rows = 139;
    let frame = 0;
    let lastFrame = 0;
    let time = 0;
    let scroll = 0;
    let targetScroll = 0;
    let rippleStart = -10;
    let points: PortraitPoint[] = [];
    let sprites: HTMLCanvasElement[][] = [];
    let dark = false;
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      strength: 0,
      targetStrength: 0,
    };

    const preparePortrait = () => {
      const data = mobile ? PORTRAIT_MOBILE : PORTRAIT_DESKTOP;
      columns = data[0].length;
      rows = data.length;
      points = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const value = PORTRAIT_TONES.indexOf(data[y][x]);
          if (value < 0) continue;
          points.push({
            x: (x + 0.5) / columns,
            y: (y + 0.5) / rows,
            tone: value / 63,
            alpha:
              (1 - smoothstep((y / rows - 0.86) / 0.14)) *
              smoothstep((x + 1) / (columns * 0.065)) *
              smoothstep((columns - x) / (columns * 0.065)),
            seed: ((x * 73 + y * 151) % 997) / 997,
            edge: x < columns * 0.19 || x > columns * 0.83 || y > rows * 0.77,
          });
        }
      }
    };

    const buildSprites = () => {
      const styles = getComputedStyle(container);
      const ink = styles.getPropertyValue("--ink").trim() || "#26251f";
      const accent = styles.getPropertyValue("--signal").trim() || "#ce492d";
      dark = document.documentElement.classList.contains("dark");
      sprites = [ink, accent].map((color) =>
        GLYPHS.map((glyph) => {
          const sprite = document.createElement("canvas");
          sprite.width = 24;
          sprite.height = 28;
          const ctx = sprite.getContext("2d");
          if (ctx) {
            ctx.scale(2, 2);
            ctx.fillStyle = color;
            ctx.font = "700 10px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(glyph, 6, 7);
          }
          return sprite;
        }),
      );
    };

    const render = () => {
      if (!width || !height || !points.length || disposed) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      const scale =
        Math.min(width / PORTRAIT_WIDTH, height / PORTRAIT_HEIGHT) * 0.96;
      const portraitWidth = PORTRAIT_WIDTH * scale;
      const portraitHeight = PORTRAIT_HEIGHT * scale;
      const left = (width - portraitWidth) / 2;
      const top = (height - portraitHeight) / 2;
      const cellWidth = portraitWidth / columns;
      const cellHeight = portraitHeight / rows;
      const radius = portraitWidth * 0.2;
      const rippleAge = time - rippleStart;

      for (const point of points) {
        let x = left + point.x * portraitWidth;
        let y = top + point.y * portraitHeight;
        const depth = Math.sin(point.x * Math.PI) * Math.sin(point.y * Math.PI);

        x += Math.sin(time * 0.42 + point.y * 7) * (0.4 + depth * 0.8);
        y += Math.cos(time * 0.34 + point.x * 6) * depth * 0.8;
        x += scroll * depth * 1.8;

        const dx = x - pointer.x;
        const dy = y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (pointer.strength > 0.001 && distance < radius) {
          const influence = (1 - distance / radius) ** 2 * pointer.strength;
          x += (dx / Math.max(1, distance)) * influence * 9;
          y += (dy / Math.max(1, distance)) * influence * 9;
        }
        if (rippleAge >= 0 && rippleAge < 2.7) {
          const fromCenter = Math.hypot(
            (point.x - 0.53) * 0.85,
            point.y - 0.42,
          );
          const wave = Math.exp(
            -((fromCenter - rippleAge * 0.31) ** 2) / 0.004,
          );
          const strength = wave * Math.sin(rippleAge * 8 - fromCenter * 13) * 8;
          x += (point.x - 0.53) * strength;
          y += (point.y - 0.42) * strength;
        }

        const density = dark ? point.tone : 1 - point.tone;
        const glyph = Math.min(GLYPHS.length - 1, Math.floor(density * 10));
        const accent = point.edge && point.seed > 0.975 ? 1 : 0;
        context.globalAlpha = point.alpha * (0.36 + density * 0.64);
        const glyphWidth = cellWidth * 1.85;
        const glyphHeight = cellHeight * 1.85;
        context.drawImage(
          sprites[accent][glyph],
          x - glyphWidth / 2,
          y - glyphHeight / 2,
          glyphWidth,
          glyphHeight,
        );
      }
      context.globalAlpha = 1;
    };

    const canAnimate = () =>
      !disposed &&
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

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const nextMobile = width < 500;
      if (nextMobile !== mobile || !points.length) {
        mobile = nextMobile;
        preparePortrait();
      }
      dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
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
      const rect = container.getBoundingClientRect();
      targetScroll = clamp(-rect.top / window.innerHeight, -1, 1);
    };
    const onMotionChange = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        pointer.strength = pointer.targetStrength = scroll = targetScroll = 0;
        time = 0;
        rippleStart = -10;
        render();
      }
      sync();
    };
    const onThemeChange = () => {
      buildSprites();
      render();
    };

    syncRef.current = sync;
    rippleRef.current = () => {
      if (reducedMotion || pausedRef.current) return;
      rippleStart = time;
      sync();
    };

    buildSprites();
    resize();
    setReady(true);
    sync();
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
    const themeObserver = new MutationObserver(onThemeChange);
    let ancestor: HTMLElement | null = container;
    while (ancestor) {
      themeObserver.observe(ancestor, {
        attributes: true,
        attributeFilter: [
          "class",
          "style",
          "data-theme",
          "data-color",
          "data-accent",
        ],
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
          transition: "opacity 200ms ease",
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
          fontSize="5.42"
          opacity="0.84"
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
          transition: "opacity 200ms ease",
        }}
      />
    </div>
  );
}

export default LivingCode;
