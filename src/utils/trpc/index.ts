import type { AppRouter } from "./routers/_app";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { QueryClient } from "@tanstack/react-query";
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
    return {
      queryClient,
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
