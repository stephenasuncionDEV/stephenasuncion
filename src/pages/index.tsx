import type { SVGIcon } from "@/types/common";

import type { NextPage } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";

import cn from "@/common/cn";

import { FaCode } from "@react-icons/all-files/fa/FaCode";
import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { FaMapMarkerAlt } from "@react-icons/all-files/fa/FaMapMarkerAlt";
import { FaReact } from "@react-icons/all-files/fa/FaReact";
import { FaTerminal } from "@react-icons/all-files/fa/FaTerminal";
import { FaWindows } from "@react-icons/all-files/fa/FaWindows";
import { motion } from "motion/react";

import { Badge } from "@/components/Core/badge";
import { Button } from "@/components/Core/button";
import { Card, CardContent } from "@/components/Core/card";

type SocialLink = {
  id: "github" | "linkedin" | "email";
  label: string;
  href: string;
  icon: SVGIcon;
};

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

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 supports-[height:100cqh]:min-h-[100cqh] supports-[height:100svh]:min-h-[100svh]">
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
            <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-6"></div>
            <p className="text-xl md:text-2xl text-slate-300 font-light">
              Full-Stack Developer & Problem Solver
            </p>
          </div>
          <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
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
                    l.id === "email" &&
                      "bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500",
                  )}
                >
                  <l.icon />
                  {l.label}
                </Button>
              </motion.a>
            ))}
          </div>
        </div>
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      </section>
      <section id="timeline" className="px-6 pt-16 pb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            The Story So Far
          </h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-400 hidden md:flex"></div>
            <div className="space-y-12">
              {timelineArr.map((t, i) => (
                <div key={i} className="relative flex items-start gap-8">
                  <div className="relative z-10 flex-shrink-0 hidden md:flex">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-2xl">
                      <t.icon />
                    </div>
                  </div>
                  <Card className="flex-1 bg-slate-700/50 border-slate-600 hover:bg-slate-700/70 transition-colors">
                    <CardContent>
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                        <h3 className="text-xl font-semibold text-white">
                          {t.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className="text-xs border-blue-400 text-blue-400 w-fit border-0"
                        >
                          {t.period}
                        </Badge>
                      </div>
                      <p className="text-slate-300 leading-relaxed mb-4">
                        {t.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {t.tags.map((tag, j) => (
                          <Badge
                            key={j}
                            variant="outline"
                            className="text-xs bg-slate-600/50 text-slate-300"
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
      <footer className="px-6 py-8 border-t border-slate-700 w-full">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Stephen Asuncion.
          </p>
          <div className="flex gap-6">
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
      </footer>
    </div>
  );
};

export default Home;
