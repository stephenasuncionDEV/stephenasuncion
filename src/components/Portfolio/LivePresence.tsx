import { useEffect, useState } from "react";

import { useLiveCursor } from "@/hooks/realtime/useLiveCursor";

import { createPortal } from "react-dom";

export { LivePresence };

export default function LivePresence() {
  const { cursors, status, visitorCount } = useLiveCursor();
  const [showCursors, setShowCursors] = useState(false);
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    scrollX: 0,
    scrollY: 0,
  });
  const hasCursors = Object.keys(cursors).length > 0;

  // Show visitor cursors only for precise pointers with motion enabled.
  useEffect(() => {
    const preference = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const syncPreference = () => setShowCursors(preference.matches);
    syncPreference();
    preference.addEventListener("change", syncPreference);
    return () => preference.removeEventListener("change", syncPreference);
  }, []);

  // Keep remote cursor positions aligned when the page scrolls or resizes.
  useEffect(() => {
    if (!showCursors || !hasCursors) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      setViewport({
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [showCursors, hasCursors]);

  const label =
    status === "connected"
      ? `${Math.max(1, visitorCount).toString().padStart(2, "0")} here now`
      : status === "connecting"
        ? "Joining the room"
        : "A little corner of the web";

  return (
    <>
      <span
        className="live-presence"
        data-status={status}
        title={
          status === "connected"
            ? "Anonymous visitors share this space. Mouse cursors appear live."
            : "Live visitor presence is currently unavailable."
        }
      >
        <span className="presence-dot" aria-hidden="true" />
        <span>{label}</span>
      </span>
      {showCursors &&
      hasCursors &&
      viewport.width > 0 &&
      typeof document !== "undefined"
        ? createPortal(
            <div className="visitor-cursors" aria-hidden="true">
              {Object.values(cursors).map((cursor) => (
                <div
                  key={cursor.id}
                  className="visitor-cursor"
                  style={{
                    color: cursor.color,
                    transform: `translate3d(${cursor.x * viewport.width - viewport.scrollX}px, ${cursor.y * viewport.height - viewport.scrollY}px, 0)`,
                  }}
                >
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <path
                      d="M1 1L16 12L9 13L6 20L1 1Z"
                      fill="currentColor"
                      stroke="var(--paper, #f4f1e9)"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="visitor-cursor-label">Fellow explorer</span>
                </div>
              ))}
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
