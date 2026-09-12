import { DefaultSeo } from "next-seo";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

import { PosthogProvider } from "@/providers/PosthogProvider";

import { queryClient, trpc } from "@/common/trpc";

import { QueryClientProvider } from "@tanstack/react-query";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Provider as ReduxProvider } from "react-redux";

import store from "@/store/index";

import "@/styles/childhood-desktop.scss";
import "@/styles/first-program.scss";
import "@/styles/globals.scss";
import "@/styles/portfolio.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <style jsx global>{`
        :root {
          --font-geist-sans: ${GeistSans.style.fontFamily};
          --font-geist-mono: ${GeistMono.style.fontFamily};
        }
      `}</style>
      <ReduxProvider store={store}>
        <DefaultSeo
          title="Stephen Asuncion — Full-Stack Developer, Vancouver"
          description="Hey, I’m Stephen Asuncion. A full-stack developer in Vancouver, making things with code since I was ten. Here’s my story and what I’m working on."
          themeColor="#f3f0e8"
          openGraph={{
            siteName: "Stephen Asuncion",
            type: "website",
            title: "Stephen Asuncion",
            description:
              "Hey, I’m Stephen Asuncion. A full-stack developer in Vancouver, making things with code since I was ten.",
            url: "https://stephenasuncion.dev/",
            images: [
              {
                url: "https://stephenasuncion.dev/assets/images/og.png",
                width: 1200,
                height: 630,
                alt: "Stephen Asuncion — Full-stack developer in Vancouver, with a self-portrait made of characters.",
                type: "image/png",
              },
            ],
          }}
          twitter={{ cardType: "summary_large_image" }}
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
            { rel: "manifest", href: "/manifest.json" },
          ]}
        />
        <PosthogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className={`${GeistSans.variable} ${GeistMono.variable}`}>
              <a className="skip-link" href="#main-content">
                Skip to content
              </a>
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </PosthogProvider>
      </ReduxProvider>
    </QueryClientProvider>
  );
};

export default trpc.withTRPC(MyApp);
