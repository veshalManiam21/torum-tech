import React from "react";
import { Header } from "@/components/Header/Header";

type BaseLayoutProps = {};

export const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="container flex-1 p-0 md:p-4">{props.children}</div>
      </div>
    </>
  );
};
