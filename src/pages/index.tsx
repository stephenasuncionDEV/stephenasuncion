import type { SVGIcon } from "@/types/common";

import type { NextPage } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";

import { useMemo, useState } from "react";

import cn from "@/common/cn";
import { trpc } from "@/common/trpc";

import { FaCode } from "@react-icons/all-files/fa/FaCode";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaPalette } from "@react-icons/all-files/fa/FaPalette";
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { FaTerminal } from "@react-icons/all-files/fa/FaTerminal";
import { FaWindows } from "@react-icons/all-files/fa/FaWindows";
import { AnimatePresence, motion } from "motion/react";

import { Badge } from "@/components/Core/badge";
import { Button } from "@/components/Core/button";
import { Card, CardContent } from "@/components/Core/card";

type SocialLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  icon: SVGIcon;
};

type ColorScheme = "blue" | "green" | "purple" | "red" | "yellow" | "orange";

const socialLinkArr: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/stephenasuncionDEV",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stephenasuncion/",
    icon: FaLinkedin,
  },
  {
    id: "email",
    label: "Get in Touch",
    href: "mailto:stephenasuncion@outlook.com",
    icon: FaEnvelope,
  },
];

const timelineArr: {
  period: string;
  title: string;
  description: string;
  tags: string[];
  icon: SVGIcon;
}[] = [
  {
    period: "Age 10",
    title: "The Beginning",
    description:
      "Started my coding journey with simple batch scripts, pranking family and friends with fake computer viruses.",
    tags: ["Batch Scripts"],
    icon: FaTerminal,
  },
  {
    period: "Grade School",
    title: "Discovering Visual Studio",
    description:
      "Found out about Visual Studio and fell in love with creating WinForms using Visual Basic and C#, building my first interactive applications.",
    tags: ["Visual Basic", "C#", ".NET WinForms"],
    icon: FaWindows,
  },
  {
    period: "High School",
    title: "Breaking Things to Learn",
    description:
      "Dove deep into C++ memory manipulations and reverse engineering, trying to hack games and understand how software really works.",
    tags: ["C++", "Memory Management", "Reverse Engineering"],
    icon: FaCode,
  },
  {
    period: "College",
    title: "Full-Stack World",
    description:
      "Expanded into the world of full-stack web development, learning modern frameworks and building complete applications.",
    tags: [
      "TypeScript",
      "Next.js (React)",
      "Databases",
      "APIs",
      "Python",
      "CI/CD",
      "AWS",
      "Cloud",
    ],
    icon: FaReact,
  },
  {
    period: "Present",
    title: "Vancouver, Canada",
    description:
      "Now based in Vancouver, I continue to grow as a developer, solving real-world problems and building solutions.",
    tags: ["Full-Stack Web Development"],
    icon: FaMapMarkerAlt,
  },
];

const colorSchemeArr: {
  id: ColorScheme;
  bg: string;
  bgGlow1: string;
  bgGlow2: string;
  text1: string;
  text2: string;
  accent: string;
  gradient: string;
  ctaBtn: string;
  card: string;
  tag: string;
  border: string;
}[] = [
  {
    id: "blue",
    bg: "from-slate-900 via-slate-800 to-slate-900",
    bgGlow1: "bg-blue-500/20",
    bgGlow2: "bg-cyan-400/20",
    text1: "text-slate-300",
    text2: "text-slate-400",
    accent: "text-blue-400",
    gradient: "from-blue-500 to-cyan-400",
    ctaBtn:
      "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500",
    card: "bg-slate-700/50 border-slate-600 hover:bg-slate-700/70",
    tag: "bg-slate-600/50 text-slate-300",
    border: "border-slate-700",
  },
  {
    id: "green",
    bg: "from-green-900 via-green-800 to-green-900",
    bgGlow1: "bg-green-500/20",
    bgGlow2: "bg-lime-400/20",
    text1: "text-green-300",
    text2: "text-green-400",
    accent: "text-green-400",
    gradient: "from-green-500 to-lime-400",
    ctaBtn:
      "bg-gradient-to-r from-green-500 to-lime-400 hover:from-green-600 hover:to-lime-500",
    card: "bg-green-700/50 border-green-600 hover:bg-green-700/70",
    tag: "bg-green-600/50 text-green-300",
    border: "border-green-700",
  },
  {
    id: "purple",
    bg: "from-purple-900 via-purple-800 to-purple-900",
    bgGlow1: "bg-purple-500/20",
    bgGlow2: "bg-violet-400/20",
    text1: "text-purple-300",
    text2: "text-purple-400",
    accent: "text-purple-400",
    gradient: "from-purple-500 to-violet-400",
    ctaBtn:
      "bg-gradient-to-r from-purple-500 to-violet-400 hover:from-purple-600 hover:to-violet-500",
    card: "bg-purple-700/50 border-purple-600 hover:bg-purple-700/70",
    tag: "bg-purple-600/50 text-purple-300",
    border: "border-purple-700",
  },
  {
    id: "yellow",
    bg: "from-yellow-900 via-yellow-800 to-yellow-900",
    bgGlow1: "bg-yellow-500/20",
    bgGlow2: "bg-amber-400/20",
    text1: "text-yellow-300",
    text2: "text-yellow-400",
    accent: "text-yellow-400",
    gradient: "from-yellow-500 to-amber-400",
    ctaBtn:
      "bg-gradient-to-r from-yellow-500 to-amber-400 hover:from-yellow-600 hover:to-amber-500",
    card: "bg-yellow-700/50 border-yellow-600 hover:bg-yellow-700/70",
    tag: "bg-yellow-600/50 text-yellow-300",
    border: "border-yellow-700",
  },
  {
    id: "orange",
    bg: "from-orange-900 via-orange-800 to-orange-900",
    bgGlow1: "bg-orange-500/20",
    bgGlow2: "bg-red-400/20",
    text1: "text-orange-300",
    text2: "text-orange-400",
    accent: "text-orange-400",
    gradient: "from-orange-500 to-red-400",
    ctaBtn:
      "bg-gradient-to-r from-orange-500 to-red-400 hover:from-orange-600 hover:to-red-500",
    card: "bg-orange-700/50 border-orange-600 hover:bg-orange-700/70",
    tag: "bg-orange-600/50 text-orange-300",
    border: "border-orange-700",
  },
  {
    id: "red",
    bg: "from-red-900 via-red-800 to-red-900",
    bgGlow1: "bg-red-500/20",
    bgGlow2: "bg-pink-400/20",
    text1: "text-red-300",
    text2: "text-red-400",
    accent: "text-red-400",
    gradient: "from-red-500 to-pink-400",
    ctaBtn:
      "bg-gradient-to-r from-red-500 to-pink-400 hover:from-red-600 hover:to-pink-500",
    card: "bg-red-700/50 border-red-600 hover:bg-red-700/70",
    tag: "bg-red-600/50 text-red-300",
    border: "border-red-700",
  },
];

const Home: NextPage = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("blue");

  const spotifyPlayback = trpc.core.getSpotifyPlayback.useQuery(undefined, {
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  const curColorScheme = useMemo(() => {
    return (
      colorSchemeArr.find((c) => c.id === colorScheme) || colorSchemeArr[0]
    );
  }, [colorScheme]);

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 supports-[height:100cqh]:min-h-[100cqh] supports-[height:100svh]:min-h-[100svh]",
        curColorScheme.bg,
      )}
    >
      <NextSeo canonical="https://stephenasuncion.dev/" />
      <ArticleJsonLd
        type="Article"
        url="https://stephenasuncion.dev/"
        title="Stephen Asuncion"
        description="Stephen Asuncion's portfolio website."
        datePublished="2024-05-10T09:50:00Z"
        dateModified="2025-08-17T09:50:00Z"
        authorName="Stephen Asuncion"
        publisherName="Stephen Asuncion"
        publisherLogo={`${process.env.NEXT_PUBLIC_HOST}/assets/images/icon-60x60.png`}
        images={[`${process.env.NEXT_PUBLIC_HOST}/assets/images/og.png`]}
      />
      <section id="hero" className="relative px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Stephen Asuncion
            </h1>
            <div
              className={cn(
                "h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6",
                curColorScheme.gradient,
              )}
            ></div>
            <p
              className={cn(
                "text-xl md:text-2xl text-slate-300 font-light",
                curColorScheme.text1,
              )}
            >
              Full-Stack Developer & Problem Solver
            </p>
          </div>
          <p
            className={cn(
              "text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8",
              curColorScheme.text2,
            )}
          >
            Passionate about turning ideas into real-world solutions with years
            of experience. From grade school batch scripts to enterprise-level
            applications, I bring creativity and technical expertise to every
            project.
          </p>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {socialLinkArr.map((l, i) => (
              <motion.a
                key={i}
                href={l.href}
                target="_blank"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className={cn(
                    "cursor-pointer bg-white/10 border-white/20 text-white hover:bg-white/20",
                    l.id === "email" && curColorScheme.ctaBtn,
                  )}
                >
                  <l.icon />
                  {l.label}
                </Button>
              </motion.a>
            ))}
          </div>
          <AnimatePresence>
            {spotifyPlayback.data && spotifyPlayback.data.isPlaying && (
              <motion.div
                className="flex items-center gap-3 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <FaSpotify className="text-green-400 w-5 h-5 shrink-0" />
                <p>
                  Currently Listening to {spotifyPlayback.data.song.name} by{" "}
                  {spotifyPlayback.data.song.artists
                    .map((a) => a.name)
                    .join(", ")}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className={cn(
            "absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse",
            curColorScheme.bgGlow1,
          )}
        ></div>
        <div
          className={cn(
            "absolute bottom-20 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000",
            curColorScheme.bgGlow2,
          )}
        ></div>
      </section>
      <section id="timeline" className="px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            The Story So Far
          </h2>
          <div className="relative">
            <div
              className={cn(
                "absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 hidden md:flex",
                curColorScheme.gradient,
              )}
            ></div>
            <div className="space-y-12">
              {timelineArr.map((t, i) => (
                <div key={i} className="relative flex items-start gap-8">
                  <div className="relative z-10 flex-shrink-0 hidden md:flex">
                    <div
                      className={cn(
                        "w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-2xl",
                        curColorScheme.gradient,
                      )}
                    >
                      <t.icon />
                    </div>
                  </div>
                  <Card
                    className={cn(
                      "flex-1 bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-colors",
                      curColorScheme.card,
                    )}
                  >
                    <CardContent>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {t.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs border-blue-400 text-blue-400 w-fit border-0",
                            curColorScheme.accent,
                          )}
                        >
                          {t.period}
                        </Badge>
                      </div>
                      <p
                        className={cn(
                          "text-slate-300 leading-relaxed mb-4",
                          curColorScheme.text1,
                        )}
                      >
                        {t.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {t.tags.map((tag, j) => (
                          <Badge
                            key={j}
                            variant="outline"
                            className={cn(
                              "text-xs bg-slate-600/50 text-slate-300",
                              curColorScheme.tag,
                            )}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <footer
        className={cn(
          "px-6 py-8 border-t border-slate-700 w-full",
          curColorScheme.border,
        )}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0 text-white">
            © {new Date().getFullYear()} Stephen Asuncion.
          </p>
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 max-md:justify-center">
            <div className="flex justify-center items-center gap-4">
              {colorSchemeArr.map((c, i) => (
                <motion.button
                  key={i}
                  className={cn(
                    "cursor-pointer disabled:cursor-default",
                    c.accent,
                  )}
                  onClick={() => {
                    if (c.id === colorScheme) return;
                    setColorScheme(c.id);
                  }}
                  whileHover={{ scale: c.id === colorScheme ? 1 : 1.1 }}
                  whileTap={{ scale: c.id === colorScheme ? 1 : 0.9 }}
                  disabled={c.id === colorScheme}
                >
                  <FaPalette />
                </motion.button>
              ))}
            </div>
            <div className="flex gap-6 items-center">
              {socialLinkArr.map((l, i) => (
                <a key={i} href={l.href} target="_blank">
                  <motion.button
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <l.icon />
                  </motion.button>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
