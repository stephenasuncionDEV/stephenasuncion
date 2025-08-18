import type { SVGIcon } from "@/types/common";

import type { NextPage } from "next";
import { ArticleJsonLd, NextSeo } from "next-seo";

import { FaEnvelope } from "@react-icons/all-files/fa/FaEnvelope";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { motion } from "framer-motion";

type SocialLink = {
  id: "github" | "linkedin" | "email";
  href: string;
  icon: SVGIcon;
};

const socialLinkArr: SocialLink[] = [
  {
    id: "github",
    href: "https://github.com/stephenasuncionDEV",
    icon: FaGithub,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/stephenasuncion/",
    icon: FaLinkedin,
  },
  {
    id: "email",
    href: "mailto:stephenasuncion@outlook.com",
    icon: FaEnvelope,
  },
];

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 supports-[height:100cqh]:min-h-[100cqh] supports-[height:100svh]:min-h-[100svh]">
      <NextSeo canonical="https://stephenasuncion.dev/" />
      <ArticleJsonLd
        type="Article"
        url="https://stephenasuncion.dev/"
        title="Stephen Asuncion"
        description="Stephen Asuncion's portfolio website."
        datePublished="2024-05-10T09:50:00Z"
        dateModified="2024-05-10T09:50:00Z"
        authorName="Stephen Asuncion"
        publisherName="Stephen Asuncion"
        publisherLogo={`${process.env.NEXT_PUBLIC_HOST}/assets/images/icon-60x60.png`}
        images={[`${process.env.NEXT_PUBLIC_HOST}/assets/images/og.png`]}
      />
      <div className="flex w-full max-w-[874px] flex-col">
        <div className="flex items-center gap-4">
          <h1 className="select-none text-xl font-bold">Stephen Asuncion</h1>
          {socialLinkArr.map((l, i) => (
            <a key={i} href={l.href} target="_blank" className="h-[16px]">
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
        <p className="mt-6 text-sm text-white/40">
          Tech has been my thing since forever. I mean, I was playing around
          with code at ten! It all kicked off with simple batch scripts. During
          elementary school, I loved creating Windows forms with Visual Basic
          and C#. While I was in high school, I was doing C++ memory
          manipulations, trying to hack the newest or oldest game out there.
          College took me deeper into the world of full-stack web development.
          Now I&apos;m in Vancouver, Canada, still powered by my passion for
          problem-solving and creating cutting-edge solutions. Let&apos;s build
          something awesome together!
        </p>
      </div>
    </div>
  );
};

export default Home;
