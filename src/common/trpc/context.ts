import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerIpAddress } from "@/common/auth";

import prisma from "../db/prisma";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const ip = getServerIpAddress({ req });

  return {
    req,
    res,
    ip,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
