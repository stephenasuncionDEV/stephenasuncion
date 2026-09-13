import { useCallback, useEffect, useRef, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  Bone,
  BoxSelect,
  Crosshair,
  HeartPulse,
  Pause,
  Play,
  RotateCcw,
  ScanLine,
  X,
} from "lucide-react";

import {
  ESP_PLAYERS,
  type EspOptions,
  hitTestEspPlayer,
  renderEspScene,
} from "@/components/Portfolio/esp-scene";

const DEFAULT_LAYERS = {
  boxes: true,
  tracers: true,
  health: true,
  skeleton: false,
};
const LAYERS = [
  { key: "boxes", label: "Boxes", icon: BoxSelect },
  { key: "tracers", label: "Tracers", icon: ScanLine },
  { key: "health", label: "Health", icon: HeartPulse },
  { key: "skeleton", label: "Skeleton", icon: Bone },
] as const;

function EspScene({
  options,
  paused,
  reducedMotion,
  resetKey,
  onSelect,
}: {
  options: EspOptions;
  paused: boolean;
  reducedMotion: boolean;
  resetKey: number;
  onSelect: (id: string | null) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const optionsRef = useRef(options);
  const timeRef = useRef(0);
  const [visible, setVisible] = useState(true);

  const draw = useCallback(() => {
    const context = canvasRef.current?.getContext("2d");
    if (context) renderEspScene(context, timeRef.current, optionsRef.current);
  }, []);

  useEffect(() => {
    optionsRef.current = options;
    draw();
  }, [options, draw]);

  useEffect(() => {
    timeRef.current = 0;
    draw();
  }, [resetKey, draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      canvas
        .getContext("2d")
        ?.setTransform(canvas.width / 960, 0, 0, canvas.height / 540, 0, 0);
      draw();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const updateVisibility = () => setVisible(!document.hidden);
    updateVisibility();
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, [draw]);

  useEffect(() => {
    if (paused || reducedMotion || !visible) {
      draw();
      return;
    }
    let frame = 0;
    let previous = performance.now();
    let lastDraw = 0;
    const animate = (now: number) => {
      timeRef.current += Math.min((now - previous) / 1000, 0.08);
      previous = now;
      if (now - lastDraw >= 1000 / 30) {
        draw();
        lastDraw = now;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [paused, reducedMotion, visible, draw]);

  return (
    <canvas
      className="esp-canvas"
      ref={canvasRef}
      width={960}
      height={540}
      role="img"
      aria-label="An island scene with four simulated players. ESP adds player boxes, tracer lines, health bars, and skeletons, including a player behind cover. Use the player buttons below to inspect them."
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 960;
        const y = ((event.clientY - rect.top) / rect.height) * 540;
        onSelect(hitTestEspPlayer(x, y, timeRef.current));
      }}
    />
  );
}

function EspSession({
  reducedMotion,
  onClose,
}: {
  reducedMotion: boolean;
  onClose: () => void;
}) {
  const [enabled, setEnabled] = useState(true);
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);
  const selected = ESP_PLAYERS.find((player) => player.id === selectedId);
  const options = { enabled, ...layers, selectedId };

  const reset = () => {
    setEnabled(true);
    setLayers(DEFAULT_LAYERS);
    setSelectedId(null);
    setPaused(false);
    setResetKey((value) => value + 1);
  };

  return (
    <Dialog.Content
      className="esp-window"
      ref={windowRef}
      data-motion={reducedMotion ? "reduced" : "full"}
      onOpenAutoFocus={(event) => {
        event.preventDefault();
        windowRef.current?.focus();
      }}
      onKeyDown={(event) => {
        if (
          event.key.toLowerCase() === "e" &&
          !event.repeat &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          event.preventDefault();
          setEnabled((value) => !value);
        }
      }}
    >
      <header className="esp-header">
        <span className="esp-archive">
          <Crosshair size={14} aria-hidden="true" /> PERSONAL ARCHIVE / 003
        </span>
        <Dialog.Close className="esp-close" aria-label="Close ESP playground">
          <X size={18} aria-hidden="true" />
        </Dialog.Close>
      </header>

      <div className="esp-intro">
        <div className="esp-title-block">
          <span className="esp-eyebrow">HIGH SCHOOL / FORTNITE</span>
          <Dialog.Title>A different way to see the game.</Dialog.Title>
          <Dialog.Description>
            Player positions, distance, and health. Suddenly, the game had
            another layer.
          </Dialog.Description>
        </div>
        <button
          type="button"
          className="esp-master"
          aria-pressed={enabled}
          data-active={enabled}
          onClick={() => setEnabled((value) => !value)}
        >
          <Crosshair size={17} aria-hidden="true" />
          <span>ESP {enabled ? "ON" : "OFF"}</span>
          <kbd>E</kbd>
        </button>
      </div>

      <div className="esp-workbench">
        <div className="esp-stage">
          <div className="esp-viewer">
            <EspScene
              options={options}
              paused={paused}
              reducedMotion={reducedMotion}
              resetKey={resetKey}
              onSelect={setSelectedId}
            />
            <div className="esp-hud" aria-hidden="true">
              <span className="esp-live">
                <i />{" "}
                {paused || reducedMotion ? "REPLAY PAUSED" : "LIVE REPLAY"}
              </span>
              <span className="esp-hud-label">BATTLE ROYALE / SANDBOX</span>
              <span className="esp-scene-count">
                {String(ESP_PLAYERS.length).padStart(2, "0")} PLAYERS
              </span>
            </div>
            <div className="esp-scene-caption">
              {enabled
                ? selected
                  ? `${selected.name} · ${selected.health} HP · ${selected.distance} m${selected.occluded ? " · BEHIND COVER" : ""}`
                  : "Four players. A little extra perspective."
                : "ESP OFF — only what you can see."}
            </div>
          </div>

          <div className="esp-controls" role="group" aria-label="ESP layers">
            {LAYERS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                type="button"
                className="esp-toggle"
                aria-pressed={layers[key]}
                disabled={!enabled}
                onClick={() =>
                  setLayers((current) => ({ ...current, [key]: !current[key] }))
                }
              >
                <Icon size={16} aria-hidden="true" />
                <span>{label}</span>
                <span className="esp-switch" aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
        <div className="esp-bottom">
          <div className="esp-story">
            <span className="esp-label">WHAT I WAS FIGURING OUT</span>
            <p>
              I made ESP hacks for Fortnite in high school. Turning player
              positions into something I could see got me hooked on C++, memory,
              and reverse engineering.
            </p>
            <div
              className="esp-roster"
              role="group"
              aria-label="Inspect a player"
            >
              {ESP_PLAYERS.map((player) => (
                <button
                  key={player.id}
                  type="button"
                  className="esp-player-button"
                  aria-pressed={selectedId === player.id}
                  data-selected={selectedId === player.id}
                  onClick={() => setSelectedId(player.id)}
                >
                  {player.name}
                </button>
              ))}
            </div>
          </div>
          <div className="esp-inspector" aria-live="polite" aria-atomic="true">
            <span className="esp-label">PLAYER INSPECTOR</span>
            <h3 className="esp-player-name">
              {selected ? selected.name : "Look a little closer."}
            </h3>
            {selected ? (
              <div className="esp-player-stats">
                <span>
                  HEALTH
                  <strong>
                    {selected.health}
                    <small> / 100</small>
                  </strong>
                </span>
                <span>
                  DISTANCE
                  <strong>
                    {selected.distance}
                    <small> m</small>
                  </strong>
                </span>
                <span>
                  VISIBILITY
                  <strong>
                    {selected.occluded ? "Behind cover" : "In sight"}
                  </strong>
                </span>
              </div>
            ) : (
              <p>
                Select a player in the scene or below the story. Try the one
                behind cover.
              </p>
            )}
          </div>
        </div>
      </div>
      <footer className="esp-footer">
        <span className="esp-hint">
          {reducedMotion
            ? "Motion is off. All ESP controls still work."
            : "Click a player to inspect · E toggles ESP"}
        </span>
        <div className="esp-actions">
          <button
            type="button"
            className="esp-quiet-button"
            aria-label={
              reducedMotion
                ? "Player movement paused for reduced motion"
                : paused
                  ? "Resume player movement"
                  : "Pause player movement"
            }
            disabled={reducedMotion}
            title={
              reducedMotion
                ? "Motion follows your device preference"
                : undefined
            }
            onClick={() => setPaused((value) => !value)}
          >
            {paused || reducedMotion ? (
              <Play size={13} aria-hidden="true" />
            ) : (
              <Pause size={13} aria-hidden="true" />
            )}
            {paused || reducedMotion ? "Resume" : "Pause"}
          </button>
          <button type="button" className="esp-quiet-button" onClick={reset}>
            <RotateCcw size={13} aria-hidden="true" />
            Reset
          </button>
          <button type="button" className="esp-back" onClick={onClose}>
            Back to my story <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        </div>
      </footer>
    </Dialog.Content>
  );
}

export default function EspPlayground() {
  const [open, setOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="esp-launcher">
        <Dialog.Trigger className="esp-trigger">
          <span className="esp-trigger-icon">
            <Crosshair size={23} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <span className="esp-trigger-copy">
            <strong>See what I saw</strong>
            <small>Fortnite · my ESP experiment</small>
          </span>
          <span className="esp-trigger-tag" aria-hidden="true">
            03
          </span>
          <ArrowUpRight
            className="esp-trigger-arrow"
            size={17}
            aria-hidden="true"
          />
        </Dialog.Trigger>
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="esp-overlay" />
        {open && (
          <EspSession
            reducedMotion={reducedMotion}
            onClose={() => setOpen(false)}
          />
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
