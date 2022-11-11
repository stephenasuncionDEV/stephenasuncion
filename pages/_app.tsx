import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { CoreProvider } from "@/providers/CoreProvider";
import theme from "@/theme/index";
import "@/styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <CoreProvider>
        <Component {...pageProps} />
      </CoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
