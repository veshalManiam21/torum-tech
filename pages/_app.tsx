import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import { NextComponentType } from "next";
import { BaseLayout } from "@/components/Layout/BaseLayout";
import { ModalProvider } from "@/providers/ModalProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { FeedProvider } from "@/providers/FeedProvider";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <AuthProvider>
      <FeedProvider>
        <ModalProvider>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </ModalProvider>
      </FeedProvider>
    </AuthProvider>
  );
};

export default App;
