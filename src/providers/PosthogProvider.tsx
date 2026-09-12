import { ReactNode, useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface PosthogProviderProps {
  children: ReactNode;
}

export const PosthogProvider = ({ children }: PosthogProviderProps) => {
  // Initialize analytics when a public project key is configured.
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;
    posthog.init(key, {
      api_host: "/ph",
      ui_host: "https://us.posthog.com",
      person_profiles: "always",
      defaults: "2025-11-30",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
    });
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
