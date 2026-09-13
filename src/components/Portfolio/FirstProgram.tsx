import { useCallback, useEffect, useRef, useState } from "react";

import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowUpRight,
  CornerDownLeft,
  FileTerminal,
  RotateCcw,
  Trophy,
  X,
} from "lucide-react";

import ChildhoodDesktop from "@/components/Portfolio/ChildhoodDesktop";

const ACHIEVEMENT_KEY = "portfolio:curiosity-unlocked:v1";
const DURATION = 13000;
const SCRIPT = [
  { at: 180, text: "C:\\STEPHEN> virus.bat", tone: "bright" },
  { at: 1300, text: "Mozilla icon. Definitely not Mozilla.", tone: "muted" },
  { at: 2800, text: "WARNING: curiosity.exe has escaped.", tone: "amber" },
  {
    at: 4200,
    text: "Infecting this page with imagination... OK",
    tone: "green",
  },
  { at: 5700, text: "Seriousness deleted. Mischief installed.", tone: "green" },
  { at: 7200, text: "hehe. got you :)", tone: "bright" },
  {
    at: 8200,
    text: "Just a message box. My cousins fell for it.",
    tone: "muted",
  },
  {
    at: 9800,
    text: '10-year-old me: "WAIT. I can MAKE things?!"',
    tone: "bright",
  },
  {
    at: 11400,
    text: "Prank complete. Putting everything back... DONE",
    tone: "green",
  },
] as const;

const PACKETS = [
  "@echo off\ncuriosity on_",
  "[ imagination overflow ]",
  ":)  :)  :)\nYOU HAVE BEEN PRANKED",
  "01001000 01001001\ntranslation: hi!",
  "C:\\IDEAS> make something",
  "mischief.dll ........ OK",
];

function TerminalSession({
  reducedMotion,
  onUnlock,
  onClose,
}: {
  reducedMotion: boolean;
  onUnlock: () => void;
  onClose: () => void;
}) {
  const [elapsed, setElapsed] = useState(reducedMotion ? DURATION : 0);
  const [command, setCommand] = useState("");
  const [reply, setReply] = useState("");
  const [playback, setPlayback] = useState(0);
  const [showDesktop, setShowDesktop] = useState(true);
  const elapsedRef = useRef(elapsed);
  const logRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const completed = !showDesktop && elapsed >= DURATION;
  const phase = showDesktop
    ? "desktop"
    : completed
      ? "restored"
      : elapsed >= 7200
        ? "reveal"
        : elapsed >= 2800
          ? "infected"
          : "boot";

  // One cancellable clock owns the entire simulation. Nothing is executed.
  useEffect(() => {
    if (showDesktop) return;
    if (reducedMotion) {
      elapsedRef.current = DURATION;
      setElapsed(DURATION);
      return;
    }
    if (elapsedRef.current >= DURATION) return;
    const started = performance.now() - elapsedRef.current;
    let frame = 0;
    let lastPaint = 0;
    const tick = (now: number) => {
      const next = Math.min(now - started, DURATION);
      if (now - lastPaint >= 32 || next === DURATION) {
        elapsedRef.current = next;
        setElapsed(next);
        lastPaint = now;
      }
      if (next < DURATION) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, completed, playback, showDesktop]);

  // Restore the exact prior page state on completion, dismissal, or unmount.
  useEffect(() => {
    if (reducedMotion || (phase !== "infected" && phase !== "reveal")) return;
    const root = document.documentElement;
    const previous = root.getAttribute("data-first-program");
    root.setAttribute("data-first-program", phase);
    return () => {
      if (previous === null) root.removeAttribute("data-first-program");
      else root.setAttribute("data-first-program", previous);
    };
  }, [phase, reducedMotion]);

  useEffect(() => {
    if (completed) onUnlock();
  }, [completed, onUnlock]);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTop = log.scrollHeight;
  }, [elapsed]);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const observer = new ResizeObserver(() => {
      log.scrollTop = log.scrollHeight;
    });
    observer.observe(log);
    return () => observer.disconnect();
  }, [showDesktop]);

  const reveal = () => {
    elapsedRef.current = DURATION;
    setElapsed(DURATION);
  };

  const replay = () => {
    elapsedRef.current = reducedMotion ? DURATION : 0;
    setElapsed(elapsedRef.current);
    setCommand("");
    setReply("");
    setPlayback((value) => value + 1);
  };

  const replayStory = () => {
    replay();
    setShowDesktop(true);
    windowRef.current?.focus({ preventScroll: true });
  };

  const submitCommand = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = command.trim().toLowerCase();
    if (!value) return;
    setCommand("");
    // A tiny, allowlisted pretend shell. Input is only ever rendered as text.
    switch (value) {
      case "help":
        setReply(
          "Try dir, hello, whoami, virus.bat, or reset. No homework required.",
        );
        break;
      case "dir":
        setReply(
          "virus.bat   1 KB  |  big-ideas.txt   ∞ KB  |  homework.doc   not found :)",
        );
        break;
      case "hello":
      case "hi":
        setReply(
          "hi!! you actually typed something! wait until my cousins see this!!",
        );
        break;
      case "whoami":
        setReply(
          "Stephen, age 10. Developer? Not yet. Dangerously curious? Absolutely.",
        );
        break;
      case "virus.bat":
      case "run":
      case "replay":
        replay();
        break;
      case "reset":
      case "exit":
        onClose();
        break;
      default:
        setReply(
          `"${value}"? I was ten. I only knew about five commands. Try help :)`,
        );
    }
  };

  const status = completed
    ? "Page restored. Curiosity remains."
    : phase === "boot"
      ? "Booting a childhood memory..."
      : phase === "infected"
        ? "Mischief in progress..."
        : "Okay, okay. It was a prank.";

  return (
    <>
      {!reducedMotion && (phase === "infected" || phase === "reveal") && (
        <div
          className="first-program-effects"
          aria-hidden="true"
          data-phase={phase}
        >
          {PACKETS.map((packet) => (
            <span className="first-program-packet" key={packet}>
              {packet}
            </span>
          ))}
        </div>
      )}
      <Dialog.Content
        ref={windowRef}
        className="first-program-window"
        data-phase={phase}
        data-motion={reducedMotion ? "reduced" : "full"}
        onOpenAutoFocus={(event) => {
          // Focus the window, avoiding an unsolicited mobile keyboard.
          event.preventDefault();
          windowRef.current?.focus();
        }}
      >
        <div className="first-program-titlebar">
          <FileTerminal
            className="first-program-window-icon"
            size={17}
            aria-hidden="true"
          />
          <span className="first-program-title">
            {showDesktop ? "My first program" : "virus.bat"}
          </span>
          <span className="first-program-window-caption">
            PERSONAL ARCHIVE / 001
          </span>
          <Dialog.Close
            className="first-program-close"
            aria-label="Close terminal and reset page"
            title="Close and reset (Esc)"
          >
            <X size={17} aria-hidden="true" />
          </Dialog.Close>
        </div>

        <div className="first-program-intro">
          <span className="first-program-eyebrow">
            A LITTLE MISCHIEF, CIRCA AGE 10
          </span>
          <Dialog.Title>
            {showDesktop
              ? "It looked like Firefox."
              : "And that’s how it started."}
          </Dialog.Title>
          <Dialog.Description>
            {showDesktop
              ? "My cousins thought they were opening the browser. A harmless recreation of what happened next."
              : "A fake virus message, a Mozilla icon, and a ten-year-old with a plan."}
          </Dialog.Description>
        </div>

        {showDesktop ? (
          <>
            <ChildhoodDesktop
              reducedMotion={reducedMotion}
              onContinue={() => {
                elapsedRef.current = reducedMotion ? DURATION : 0;
                setElapsed(elapsedRef.current);
                setShowDesktop(false);
                windowRef.current?.focus({ preventScroll: true });
              }}
            />
            <div className="first-program-footer">
              <span className="first-program-status">
                <i aria-hidden="true" />
                Windows 7. Maximum mischief.
              </span>
              <button
                type="button"
                className="first-program-quiet-button"
                onClick={onClose}
              >
                Back to my story
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="first-program-screen">
              <div className="first-program-screen-header">
                <span>STEPHEN’S COMPUTER</span>
                <span>640 KB / ∞ IDEAS</span>
              </div>
              <div
                className="first-program-progress"
                role="progressbar"
                aria-label="First program playback"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.floor((elapsed / DURATION) * 100)}
              >
                <i style={{ width: `${(elapsed / DURATION) * 100}%` }} />
              </div>

              <div
                className="first-program-log"
                ref={logRef}
                role="region"
                aria-label="Program transcript"
                aria-live="off"
                tabIndex={0}
              >
                {SCRIPT.filter((line) => elapsed >= line.at).map((line) => {
                  const characters = completed
                    ? line.text.length
                    : Math.max(0, Math.floor((elapsed - line.at) / 24));
                  const typing = characters < line.text.length;
                  return (
                    <div
                      className="first-program-line"
                      data-tone={line.tone}
                      key={line.at}
                    >
                      {line.text.slice(0, characters)}
                      {typing && (
                        <span className="first-program-cursor">▌</span>
                      )}
                    </div>
                  );
                })}
                {(phase === "reveal" || completed) && (
                  <pre className="first-program-ascii" aria-hidden="true">
                    {
                      "  .--------.\n  |  ^  ^  |   no files harmed.\n  |   __   |   one future unlocked.\n  '---[]---'"
                    }
                  </pre>
                )}
              </div>

              <div
                className="first-program-sr-only"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                {status}
                {completed &&
                  " Curiosity unlocked. At ten, I disguised a fake virus message box with a Mozilla icon on Windows 7. My cousins double-clicked it. Making a computer do something I imagined was all it took."}
              </div>

              <form className="first-program-command" onSubmit={submitCommand}>
                <label htmlFor="first-program-command">
                  <span aria-hidden="true">C:\&gt;</span>
                  <span className="first-program-sr-only">
                    Terminal command
                  </span>
                </label>
                <input
                  id="first-program-command"
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  placeholder="try typing help"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  maxLength={80}
                  aria-describedby="first-program-command-hint"
                />
                <button type="submit" aria-label="Run terminal command">
                  <CornerDownLeft size={15} aria-hidden="true" />
                  <span>Enter</span>
                </button>
              </form>
              <div
                id="first-program-command-hint"
                className="first-program-command-hint"
                role="status"
                aria-live="polite"
              >
                {reply || "Optional side quest: say hello. I wrote a reply."}
              </div>
            </div>

            {reducedMotion && (
              <p className="first-program-motion-note">
                Motion is off. The whole story, all at once.
              </p>
            )}

            {completed && (
              <div className="first-program-achievement">
                <div className="first-program-achievement-icon">
                  <Trophy size={25} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="first-program-achievement-copy">
                  <small>SECRET FOUND / 001</small>
                  <h3>CURIOSITY UNLOCKED</h3>
                  <p>Turns out, making people smile was the first feature.</p>
                </div>
              </div>
            )}

            <div className="first-program-footer">
              <span className="first-program-status">
                <i aria-hidden="true" />
                {status}
              </span>
              <div className="first-program-actions">
                <button
                  type="button"
                  className="first-program-quiet-button"
                  onClick={completed ? replayStory : reveal}
                >
                  {completed && <RotateCcw size={13} aria-hidden="true" />}
                  {completed ? "Replay" : "Skip to reveal"}
                </button>
                <button
                  type="button"
                  className="first-program-reset"
                  onClick={onClose}
                >
                  {completed ? "Back to my story" : "Reset page"}
                  <span aria-hidden="true">↵</span>
                </button>
              </div>
            </div>
          </>
        )}
      </Dialog.Content>
    </>
  );
}

export default function FirstProgram() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    try {
      setUnlocked(window.localStorage.getItem(ACHIEVEMENT_KEY) === "true");
    } catch {
      // The Easter egg also works when browser storage is unavailable.
    }
    return () => media.removeEventListener("change", update);
  }, []);

  const unlock = useCallback(() => {
    setUnlocked(true);
    try {
      window.localStorage.setItem(ACHIEVEMENT_KEY, "true");
    } catch {
      // Keep the achievement for this visit even in private storage modes.
    }
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <div className="first-program-launcher">
        <Dialog.Trigger className="first-program-trigger">
          <span className="first-program-file-icon">
            <FileTerminal size={24} strokeWidth={1.4} aria-hidden="true" />
          </span>
          <span className="first-program-trigger-copy">
            <strong>Run my first program</strong>
            <small>virus.bat · a little harmless mischief</small>
          </span>
          <ArrowUpRight
            className="first-program-trigger-arrow"
            size={18}
            aria-hidden="true"
          />
        </Dialog.Trigger>
        {unlocked && (
          <span className="first-program-earned">
            <Trophy size={11} aria-hidden="true" /> CURIOSITY UNLOCKED
          </span>
        )}
      </div>
      <Dialog.Portal>
        <Dialog.Overlay className="first-program-overlay" />
        {open && (
          <TerminalSession
            reducedMotion={reducedMotion}
            onUnlock={unlock}
            onClose={() => setOpen(false)}
          />
        )}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
