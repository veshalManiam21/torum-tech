import React from "react";

import type { GetStaticProps } from "next";
import { NextPage } from "../typings/types";
import { InputText } from "@/components/InputText/InputText";
import { Button } from "@/components/Button/Button";

type IndexPageProps = {};

const IndexPage: NextPage<IndexPageProps> = () => {
  const login = () => {};

  return (
    <main className="min-h-screen">
      <div className="container absolute top-0 left-0 right-0 bottom-0 m-auto h-min">
        <div className="border border-white bg-black-0c0f13 rounded-lg p-8 max-w-xs m-auto">
          <h3 className="text-2xl mb-4 text-center">Login Page</h3>
          <div className="w-full space-y-2 mb-4">
            <InputText placeholder="Email" autoComplete="no" />
            <InputText
              type="password"
              placeholder="Password"
              autoComplete="no"
            />
          </div>
          <Button
            className="w-full"
            customColorClassName="text-black-0c0f13 bg-white hover:bg-black-0c0f13 hover:text-white"
            onClick={login}
          >
            Login
          </Button>
        </div>
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
