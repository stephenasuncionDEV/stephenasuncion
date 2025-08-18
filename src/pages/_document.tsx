import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html
      lang="en"
      className="dark"
      style={{
        colorScheme: "dark",
      }}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
