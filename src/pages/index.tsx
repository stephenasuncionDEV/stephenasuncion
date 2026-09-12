import type { NextPage } from "next";
import { NextSeo } from "next-seo";

import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";

import FirstProgram from "@/components/Portfolio/FirstProgram";
import GitHubStats from "@/components/Portfolio/GitHubStats";
import LivePresence from "@/components/Portfolio/LivePresence";
import { LivingCode } from "@/components/Portfolio/LivingCode";
import NowPlaying from "@/components/Portfolio/NowPlaying";
import { SiteHeader } from "@/components/Portfolio/SiteHeader";

const journey = [
  {
    period: "AGE 10",
    title: "A little mischief. A lot of curiosity.",
    text: "At ten, I disguised a prank program with a Mozilla icon on our Windows 7 desktop. My cousins double-clicked it, expecting the browser. Instead: a message box saying there was a virus. Making a computer do something I imagined was all it took.",
    tools: "Batch scripts",
  },
  {
    period: "GRADE SCHOOL",
    title: "From scripts to screens.",
    text: "Visual Studio opened a new door. With Visual Basic and C#, I started making Windows applications I could actually click and interact with.",
    tools: "Visual Basic / C# / .NET WinForms",
  },
  {
    period: "HIGH SCHOOL",
    title: "Taking things apart.",
    text: "Games made me want to understand what was happening underneath. C++, memory manipulation, and reverse engineering became my way of learning how software really works.",
    tools: "C++ / Memory / Reverse engineering",
  },
  {
    period: "COLLEGE",
    title: "Connecting the whole picture.",
    text: "I moved into full-stack development: interfaces, APIs, databases, and the infrastructure that connects them. Building complete applications brought it all together.",
    tools: "TypeScript / Next.js / Python / AWS / CI/CD",
  },
  {
    period: "TODAY",
    title: "Still curious. Still building.",
    text: "Now based in Vancouver, I’m turning that same curiosity toward real-world problems. Different tools, bigger ideas, the same instinct to make things work.",
    tools: "Vancouver, Canada",
    current: true,
  },
];

const Home: NextPage = () => {
  const [paused, setPaused] = useState(false);
  const [motifKey, setMotifKey] = useState(0);

  const [reducedMotion, setReducedMotion] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle",
  );

  // Keep the animation controls in sync with the device motion preference.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  // Clear the email-copy feedback after three seconds.
  useEffect(() => {
    if (copyStatus === "idle") return;
    const timeout = window.setTimeout(() => setCopyStatus("idle"), 3000);
    return () => window.clearTimeout(timeout);
  }, [copyStatus]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("stephenasuncion@outlook.com");
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <div className="portfolio">
      <NextSeo canonical="https://stephenasuncion.dev/" />
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <section
          id="hero"
          className="hero page-shell"
          aria-labelledby="hero-title"
        >
          <div className="hero-heading-label mono">
            <span className="status-dot" /> A DEVELOPER IN VANCOUVER, CANADA
          </div>
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-greeting">Hey, I’m</p>
              <h1 id="hero-title">
                Stephen
                <br />
                <em>Asuncion.</em>
              </h1>
              <p className="hero-description">
                I started coding at ten. These days, I’m a full-stack developer
                in Vancouver, still figuring out what I can make next.
              </p>
              <div className="hero-actions">
                <a href="#about" className="text-link hero-story-link">
                  A bit about me <ArrowDown size={17} />
                </a>
                <a href="#contact" className="text-link">
                  Say hello <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="hero-art">
              <LivingCode paused={paused} motifKey={motifKey} />
              <p className="portrait-caption">
                <span aria-hidden="true">↖</span> yep, that’s me.{" "}
                <span className="portrait-caption-note">
                  a few thousand characters later.
                </span>
              </p>
            </div>
          </div>
          <div className="hero-bottom">
            <NowPlaying />
            <div className="art-controls">
              <span className="mono art-interaction-label">
                {reducedMotion
                  ? "ME, IN CHARACTERS"
                  : "A SELF-PORTRAIT, WRITTEN IN CODE"}
              </span>
              <button
                className="icon-button"
                onClick={() => setMotifKey((value) => value + 1)}
                aria-label="Ripple the character portrait"
                title="Give it a ripple"
                disabled={reducedMotion || paused}
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="icon-button"
                onClick={() => setPaused((value) => !value)}
                aria-label={
                  paused
                    ? "Play portrait animation"
                    : "Pause portrait animation"
                }
                aria-pressed={paused}
                disabled={reducedMotion}
                title={
                  reducedMotion
                    ? "Motion follows your device preference"
                    : paused
                      ? "Play animation"
                      : "Pause animation"
                }
              >
                {paused || reducedMotion ? (
                  <Play size={14} />
                ) : (
                  <Pause size={14} />
                )}
              </button>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="about-section"
          aria-labelledby="about-title"
        >
          <span id="timeline" className="legacy-anchor" aria-hidden="true" />
          <div className="page-shell section-space">
            <div className="section-label mono">
              <span>A LITTLE ABOUT ME</span>
            </div>
            <div className="about-grid">
              <div className="about-intro">
                <span className="about-asterisk" aria-hidden="true">
                  ✳
                </span>
                <h2 id="about-title">
                  How I
                  <br />
                  <em>got here.</em>
                </h2>
                <p>
                  Before web apps, there were batch scripts and fake computer
                  viruses to prank my family. That’s where this all started.
                </p>
                <p>
                  These days I work with TypeScript, Next.js, React, Python,
                  APIs, and databases. I still like figuring out how things
                  work.
                </p>
                <div className="about-byline">
                  <div className="about-location mono">
                    <span className="status-dot" /> CURRENTLY BUILDING IN
                    <br />
                    <span>VANCOUVER, CANADA ↗</span>
                  </div>
                </div>
              </div>
              <ol className="journey">
                {journey.map((chapter, index) => (
                  <li
                    className={
                      chapter.current
                        ? "journey-chapter is-current"
                        : "journey-chapter"
                    }
                    key={chapter.period}
                  >
                    <div className="journey-marker mono">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <span className="journey-period mono">
                        {chapter.period}
                      </span>
                      <h3>{chapter.title}</h3>
                      <p>{chapter.text}</p>
                      <span className="journey-tools mono">
                        {chapter.tools}
                      </span>
                      {chapter.period === "AGE 10" && <FirstProgram />}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <GitHubStats />

        <section
          id="contact"
          className="contact-section page-shell section-space"
          aria-labelledby="contact-title"
        >
          <div className="section-label mono">
            <span>MY INBOX IS OPEN</span>
          </div>
          <div className="contact-top">
            <h2 id="contact-title">
              Say
              <br />
              <em>hello.</em>
            </h2>
            <div className="contact-aside">
              <span className="contact-spark" aria-hidden="true">
                ↗
              </span>
              <p>
                Have something in mind,
                <br />
                or just want to chat?
                <br />
                You can reach me here.
              </p>
            </div>
          </div>
          <div className="contact-email-row">
            <a
              className="contact-email"
              href="mailto:stephenasuncion@outlook.com"
            >
              stephenasuncion@outlook.com <ArrowUpRight strokeWidth={1.5} />
            </a>
            <button
              className="copy-email icon-button"
              onClick={copyEmail}
              aria-label="Copy email address"
              title="Copy email address"
            >
              {copyStatus === "copied" ? (
                <Check size={19} />
              ) : (
                <Copy size={19} />
              )}
            </button>
          </div>
          <p className="copy-status mono" role="status">
            {copyStatus === "copied"
              ? "EMAIL COPIED. SAY HELLO WHEN YOU’RE READY."
              : copyStatus === "failed"
                ? "YOU CAN SELECT THE ADDRESS ABOVE TO COPY IT."
                : ""}
          </p>
          <div className="contact-socials">
            <a
              className="text-link"
              href="https://github.com/stephenasuncionDEV"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={17} />
            </a>
            <a
              className="text-link"
              href="https://www.linkedin.com/in/stephenasuncion/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer className="site-footer page-shell">
        <div className="footer-top">
          <a
            href="#hero"
            className="footer-signature"
            aria-label="Stephen Asuncion, back to top"
          >
            Stephen Asuncion<span>© {new Date().getFullYear()}</span>
          </a>
          <LivePresence />
          <a className="back-to-top mono" href="#hero">
            BACK TO TOP <ArrowUp size={15} />
          </a>
        </div>
        <div className="footer-bottom mono">
          <span>STEPHEN ASUNCION · VANCOUVER</span>
          <a
            href="https://github.com/stephenasuncionDEV/stephenasuncion"
            target="_blank"
            rel="noopener noreferrer"
          >
            VIEW SOURCE <ArrowUpRight size={12} />
          </a>
          <span>THANKS FOR STOPPING BY.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
