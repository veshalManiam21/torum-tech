import React from "react";
import { NextPage } from "../typings/types";
import { Feed } from "@/components/Feed/Feed";

import type { GetStaticProps } from "next";

type IndexPageProps = {};

const IndexPage: NextPage<IndexPageProps> = () => {
  const login = () => {};

  return (
    <main className="">
      <Feed />
    </main>
  );
};

export const getStaticProps: GetStaticProps<IndexPageProps> = async () => {
  return {
    props: {},
  };
};

export default IndexPage;
