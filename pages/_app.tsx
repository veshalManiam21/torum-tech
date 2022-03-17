import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import { NextComponentType } from "next";
import { BaseLayout } from "@/components/Layout/BaseLayout";
import { ModalProvider } from "@/providers/ModalProvider";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <ModalProvider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </ModalProvider>
  );
};

export default App;
