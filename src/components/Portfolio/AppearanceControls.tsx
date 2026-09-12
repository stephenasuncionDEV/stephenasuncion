import { useTheme } from "next-themes";

import { useEffect, useId, useState } from "react";

import { Check, Moon, SlidersHorizontal, Sun } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/Core/popover";

const accents = [
  { value: "red", label: "Red", color: "#c4472d" },
  { value: "blue", label: "Blue", color: "#3659ba" },
  { value: "green", label: "Green", color: "#38745b" },
  { value: "purple", label: "Purple", color: "#8052a5" },
  { value: "yellow", label: "Yellow", color: "#b88b22" },
  { value: "orange", label: "Orange", color: "#bc651f" },
] as const;

type Accent = (typeof accents)[number]["value"];

function isAccent(value: string | null | undefined): value is Accent {
  return accents.some((accent) => accent.value === value);
}

export function AppearanceControls() {
  const { resolvedTheme, setTheme } = useTheme();
  const [accent, setAccent] = useState<Accent>("red");
  const [mounted, setMounted] = useState(false);
  const headingId = useId();
  const themeLabelId = useId();
  const accentLabelId = useId();

  // Restore the saved accent after hydration and synchronize changes across tabs.
  useEffect(() => {
    const initialAccent = document.documentElement.dataset.accent;
    let savedAccent: string | null | undefined = initialAccent;

    try {
      savedAccent = localStorage.getItem("portfolio-accent") || initialAccent;
    } catch {
      savedAccent = initialAccent;
    }

    const nextAccent = isAccent(savedAccent) ? savedAccent : "red";
    document.documentElement.dataset.accent = nextAccent;
    setAccent(nextAccent);
    setMounted(true);

    const syncAccent = (event: StorageEvent) => {
      if (event.key !== "portfolio-accent") return;

      const value = isAccent(event.newValue) ? event.newValue : "red";
      document.documentElement.dataset.accent = value;
      setAccent(value);
    };

    window.addEventListener("storage", syncAccent);
    return () => window.removeEventListener("storage", syncAccent);
  }, []);

  const changeAccent = (value: Accent) => {
    document.documentElement.dataset.accent = value;
    setAccent(value);

    try {
      localStorage.setItem("portfolio-accent", value);
    } catch {
      return;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="appearance-trigger"
          type="button"
          aria-label="Customize appearance"
        >
          <SlidersHorizontal size={16} strokeWidth={1.6} aria-hidden="true" />
          <span className="appearance-trigger-label">Appearance</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="appearance-popover"
        align="end"
        sideOffset={14}
        collisionPadding={16}
        aria-labelledby={headingId}
      >
        <p className="appearance-heading" id={headingId}>
          Make yourself at home.
        </p>
        <p className="appearance-caption" id={themeLabelId}>
          Canvas
        </p>
        <div
          className="appearance-theme-options"
          role="group"
          aria-labelledby={themeLabelId}
        >
          <button
            className="appearance-theme-option"
            type="button"
            aria-pressed={mounted && resolvedTheme === "light"}
            data-selected={mounted && resolvedTheme === "light"}
            onClick={() => setTheme("light")}
          >
            <Sun size={16} strokeWidth={1.6} aria-hidden="true" />
            Light
          </button>
          <button
            className="appearance-theme-option"
            type="button"
            aria-pressed={mounted && resolvedTheme === "dark"}
            data-selected={mounted && resolvedTheme === "dark"}
            onClick={() => setTheme("dark")}
          >
            <Moon size={16} strokeWidth={1.6} aria-hidden="true" />
            Dark
          </button>
        </div>
        <p className="appearance-caption" id={accentLabelId}>
          A little color
        </p>
        <div
          className="appearance-colors"
          role="group"
          aria-labelledby={accentLabelId}
        >
          {accents.map((option) => (
            <button
              key={option.value}
              className="appearance-color"
              type="button"
              aria-label={`${option.label} accent`}
              title={option.label}
              aria-pressed={accent === option.value}
              data-selected={accent === option.value}
              onClick={() => changeAccent(option.value)}
            >
              <span
                className="appearance-color-dot"
                style={{ backgroundColor: option.color }}
                aria-hidden="true"
              >
                {accent === option.value && <Check size={12} strokeWidth={2} />}
              </span>
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
