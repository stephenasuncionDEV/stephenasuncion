import { useRouter } from "next/router";

import { type ReactNode, useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface PosthogProviderProps {
  children: ReactNode;
}

if (
  typeof window !== "undefined" &&
  process.env.NEXT_PUBLIC_POSTHOG_KEY &&
  process.env.NODE_ENV !== "development"
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_UI_HOST,
    capture_pageview: false,
  });
}

export const PosthogProvider = ({ children }: PosthogProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
