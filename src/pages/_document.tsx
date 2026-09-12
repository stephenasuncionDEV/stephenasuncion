import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var accent=localStorage.getItem('portfolio-accent');if(['red','blue','green','purple','yellow','orange'].includes(accent))document.documentElement.dataset.accent=accent}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Stephen Asuncion",
              url: "https://stephenasuncion.dev/",
              jobTitle: "Full-Stack Developer",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Vancouver",
                addressCountry: "CA",
              },
              sameAs: [
                "https://github.com/stephenasuncionDEV",
                "https://www.linkedin.com/in/stephenasuncion/",
              ],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
