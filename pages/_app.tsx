import "../styles/globals.css";
import type { AppContext, AppInitialProps, AppProps } from "next/app";

import { NextComponentType } from "next";
import { BaseLayout } from "@/components/Layout/BaseLayout";

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
};

export default App;
