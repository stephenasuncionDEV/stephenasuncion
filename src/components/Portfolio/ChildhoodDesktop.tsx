import Image from "next/image";

import { useEffect, useId, useRef, useState } from "react";

import { X } from "lucide-react";

export default function ChildhoodDesktop({
  onContinue,
  reducedMotion,
}: {
  onContinue: () => void;
  reducedMotion: boolean;
}) {
  const [selected, setSelected] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const pointerType = useRef("");
  const okayRef = useRef<HTMLButtonElement>(null);
  const instructionId = useId();
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    if (messageOpen) okayRef.current?.focus({ preventScroll: true });
  }, [messageOpen]);

  return (
    <div
      className="childhood-desktop-experience"
      data-motion={reducedMotion ? "reduced" : "full"}
    >
      <div
        className="childhood-desktop"
        role="group"
        aria-label="A recreation of my childhood Windows 7 desktop"
      >
        <div className="childhood-desktop-wallpaper" aria-hidden="true">
          <div className="childhood-desktop-light-curve" />
          <div className="childhood-desktop-wallpaper-mark">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span className="childhood-desktop-sparkle" />
          <span className="childhood-desktop-sparkle" />
          <span className="childhood-desktop-sparkle" />
        </div>

        <button
          type="button"
          className="childhood-desktop-shortcut"
          data-selected={selected}
          disabled={messageOpen}
          aria-label="Open Mozilla Firefox"
          aria-describedby={instructionId}
          onPointerDown={(event) => {
            pointerType.current = event.pointerType;
          }}
          onClick={(event) => {
            // Mouse clicks select; native keyboard activation and taps open.
            if (
              event.detail === 0 ||
              pointerType.current === "touch" ||
              pointerType.current === "pen"
            ) {
              setMessageOpen(true);
            } else {
              setSelected(true);
            }
          }}
          onDoubleClick={() => setMessageOpen(true)}
        >
          <span className="childhood-desktop-shortcut-image">
            <Image
              src="/assets/firefox-classic.svg"
              width={48}
              height={48}
              alt=""
              draggable={false}
              unoptimized
            />
            <span
              className="childhood-desktop-shortcut-arrow"
              aria-hidden="true"
            >
              ↗
            </span>
          </span>
          <span>Mozilla Firefox</span>
        </button>

        <span className="childhood-desktop-invitation" aria-hidden="true">
          Double-click the browser.
          <br />
          <em>I dare you.</em>
        </span>

        <div className="childhood-desktop-taskbar" aria-hidden="true">
          <span className="childhood-desktop-start-orb">
            <span className="childhood-desktop-start-flag">
              <i />
              <i />
              <i />
              <i />
            </span>
          </span>
          <span className="childhood-desktop-taskbar-folder" />
          <span className="childhood-desktop-taskbar-browser">
            <Image
              src="/assets/firefox-classic.svg"
              width={24}
              height={24}
              alt=""
              draggable={false}
              unoptimized
            />
          </span>
          <span className="childhood-desktop-taskbar-divider" />
          <span className="childhood-desktop-taskbar-tray">▴</span>
          <span className="childhood-desktop-clock">
            <span>10:00</span>
            <span>AGE 10</span>
          </span>
          <span className="childhood-desktop-show-desktop" />
        </div>

        {messageOpen && (
          <div
            className="childhood-desktop-message"
            role="alert"
            aria-labelledby={titleId}
            aria-describedby={messageId}
          >
            <div className="childhood-desktop-message-titlebar">
              <Image
                src="/assets/firefox-classic.svg"
                width={16}
                height={16}
                alt=""
                draggable={false}
                unoptimized
              />
              <span id={titleId}>Mozilla Firefox</span>
              <button
                type="button"
                className="childhood-desktop-message-close"
                onClick={onContinue}
                aria-label="Dismiss prank message and continue the story"
              >
                <X size={13} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
            <div className="childhood-desktop-message-panel">
              <div className="childhood-desktop-message-body">
                <span
                  className="childhood-desktop-error-icon"
                  aria-hidden="true"
                >
                  <X size={23} strokeWidth={3.5} />
                </span>
                <p id={messageId}>There is a virus on your computer!</p>
              </div>
              <div className="childhood-desktop-message-footer">
                <button
                  type="button"
                  className="childhood-desktop-okay"
                  ref={okayRef}
                  onClick={onContinue}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <p className="childhood-desktop-instruction" id={instructionId}>
        <span className="childhood-desktop-instruction-mouse">
          Double-click · or select and press Enter
        </span>
        <span className="childhood-desktop-instruction-touch">
          Tap the browser
        </span>
        <span className="childhood-desktop-instruction-note">
          Just like my cousins did.
        </span>
      </p>
    </div>
  );
}
