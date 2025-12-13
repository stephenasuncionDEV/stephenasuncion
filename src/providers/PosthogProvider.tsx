import { ReactNode, useEffect } from "react";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

interface PosthogProviderProps {
  children: ReactNode;
}

export const PosthogProvider = ({ children }: PosthogProviderProps) => {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
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
