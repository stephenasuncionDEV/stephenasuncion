import type { NextApiRequest, NextApiResponse } from "next";

import { createContext } from "@/common/trpc/context";
import { appRouter } from "@/common/trpc/routers/_app";

import { createNextApiHandler } from "@trpc/server/adapters/next";

export const config = {
  maxDuration: 200,
};

const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`[tRPC] failed on ${path}: ${error}`);
        }
      : undefined,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  return nextApiHandler(req, res);
}
