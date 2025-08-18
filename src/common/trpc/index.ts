import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./routers/_app";

import { QueryClient } from "@tanstack/react-query";
import { httpBatchLink, httpLink, loggerLink, splitLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const trpc = createTRPCNext<AppRouter>({
  config() {
    const url = `${process.env.NEXT_PUBLIC_HOST}/api/trpc`;

    return {
      queryClient,
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        splitLink({
          condition(op) {
            return Boolean(op.context.skipBatch);
          },
          true: httpLink({
            url,
          }),
          false: httpBatchLink({
            url,
          }),
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
