import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import { PosthogProvider } from "@/providers/PosthogProvider";

import { queryClient, trpc } from "@/common/trpc";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";

import store from "@/store/index";

import "@/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <DefaultSeo
          title="Stephen Asuncion"
          description="Passionate about turning ideas into real-world solutions with years of experience. From grade school batch scripts to enterprise-level applications, I bring creativity and technical expertise to every project."
          themeColor="#6D28D9"
          openGraph={{
            siteName: "Stephen Asuncion",
            type: "website",
            title: "Stephen Asuncion",
            description:
              "Passionate about turning ideas into real-world solutions with years of experience. From grade school batch scripts to enterprise-level applications, I bring creativity and technical expertise to every project.",
            url: process.env.NEXT_PUBLIC_HOST,
            images: [
              {
                url: `${process.env.NEXT_PUBLIC_HOST}/assets/images/og.png`,
                width: 1200,
                height: 630,
                alt: "OG Image",
                type: "image/png",
              },
            ],
          }}
          additionalMetaTags={[
            {
              name: "viewport",
              content: "width=device-width, initial-scale=1.0",
            },
          ]}
          additionalLinkTags={[
            {
              rel: "icon",
              type: "image/x-icon",
              href: "/favicon.ico",
            },
          ]}
        />
        <PosthogProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </PosthogProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
