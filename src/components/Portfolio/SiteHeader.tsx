import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

import { AppearanceControls } from "@/components/Portfolio/AppearanceControls";

const sections = [
  { id: "about", label: "About" },
  { id: "work", label: "GitHub" },
  { id: "contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { pathname } = useRouter();
  const [activeSection, setActiveSection] = useState("");

  // Highlight the navigation link for the section currently being read.
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    let frame = 0;

    const updateSection = () => {
      frame = 0;
      const readingPosition = window.innerHeight * 0.35;
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= readingPosition) {
          current = section.id;
        }
      }

      if (
        window.scrollY > 0 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 4
      ) {
        current = "contact";
      }

      setActiveSection(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateSection);
    };

    updateSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          className="site-brand"
          href="/#hero"
          aria-label="Stephen Asuncion — home"
        >
          <span className="site-brand-mark" aria-hidden="true">
            sa<span>.</span>
          </span>
          <span className="site-brand-name">Stephen Asuncion</span>
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          {sections.map((section) => (
            <Link
              key={section.id}
              className="site-nav-link"
              href={`/#${section.id}`}
              aria-current={
                activeSection === section.id ? "location" : undefined
              }
              data-active={activeSection === section.id}
            >
              {section.label}
            </Link>
          ))}
        </nav>
        <AppearanceControls />
      </div>
    </header>
  );
}
