import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerIpAddress } from "@/common/auth";

import prisma from "../db/prisma";
import spotify from "../spotify";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const ip = getServerIpAddress({ req });

  return {
    req,
    res,
    ip,
    prisma,
    spotify,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
