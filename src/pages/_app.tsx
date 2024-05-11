import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";
import { PosthogProvider } from "@/providers/PosthogProvider";
import { queryClient, trpc } from "@/utils/trpc";
import store from "@/store/index";
import "@/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxProvider store={store}>
        <DefaultSeo
          title="Stephen Asuncion"
          description="Stephen Asuncion's portfolio website."
          themeColor="#EBA300"
          openGraph={{
            siteName: "Stephen Asuncion",
            type: "website",
            title: "Stephen Asuncion",
            description: "Stephen Asuncion's portfolio website.",
            url: process.env.NEXT_PUBLIC_BASE_URL,
            images: [
              {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/og.png`,
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
