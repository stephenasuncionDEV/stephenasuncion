import type { NextPage } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";
import { motion } from "framer-motion";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background supports-[height:100cqh]:min-h-[100cqh] supports-[height:100svh]:min-h-[100svh]">
      <div className="flex w-full max-w-[874px] flex-col">
        <div className="flex items-center gap-4">
          <h1 className="select-none text-xl font-bold">Stephen Asuncion</h1>
          <a
            href="https://github.com/stephenasuncionDEV"
            target="_blank"
            className="h-[16px] "
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -5, color: "hsl(var(--primary))" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <FaGithub />
            </motion.button>
          </a>
          <a
            href="https://www.linkedin.com/in/stephenasuncion/"
            target="_blank"
            className="h-[16px]"
          >
            <motion.button
              whileHover={{ scale: 1.1, y: -5, color: "hsl(var(--primary))" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <FaLinkedin />
            </motion.button>
          </a>
        </div>
        <Card className="mt-4 w-full">
          <CardContent className="text-sm text-white/40">
            Tech has been my thing since forever. I mean, I was tinkering with
            code at ten! It all kicked off with simple batch scripts, but then I
            hit gold with Visual Basic and C#. College took me deeper into the
            world of software, from C++ memory hacks to full-stack web wizardry.
            Now I&apos;m in Surrey, BC, Canada, still powered by my passion for
            problem-solving and creating cutting-edge solutions. Let&apos;s
            build something awesome together!
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
