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
        <p className="mt-6 text-sm text-white/40">
          Tech has been my thing since forever. I mean, I was playing around
          with code at ten! It all kicked off with simple batch scripts, then I
          loved creating window forms with Visual Basic and C#. While I was in
          highschool I was doing C++ memory manipulations, trying to hack the
          newest/oldest game out there. College took me deeper into the world of
          web development. Now I&apos;m in Surrey, BC, Canada, still powered by
          my passion for problem-solving and creating cutting-edge solutions.
          Let&apos;s build something awesome together!
        </p>
        {/* <Card className="mt-4 w-full">
          <CardContent >
            
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Home;
