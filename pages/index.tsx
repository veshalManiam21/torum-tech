import React from "react";

import type { GetStaticProps } from "next";
import { NextPage } from "../typings/types";
import { InputText } from "@/components/InputText/InputText";

type IndexPageProps = {};

const IndexPage: NextPage<IndexPageProps> = () => {
  return (
    <div className="min-h-screen">
      <div className="container absolute top-0 left-0 right-0 bottom-0 m-auto h-min">
        <div className="border border-white rounded-lg p-4 max-w-md m-auto">
          <h3 className="text-2xl mb-4 text-center">Login Page</h3>
          <div className="w-full space-y-2">
            <InputText placeholder="Email" autoComplete="no" />
            <InputText
              type="password"
              placeholder="Password"
              autoComplete="no"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
