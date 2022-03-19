import React from "react";

import type { GetStaticProps, GetStaticPaths } from "next";
import type { NextPage } from "@/typings/types";
import { FeedItemProps, SingleFeedType } from "@/providers/FeedProvider";
import { FeedCard } from "@/components/Feed/FeedCard/FeedCard";

type SingleFeedPageProps = {
  feed: SingleFeedType;
};

const SingleFeedPage: NextPage<SingleFeedPageProps> = ({ feed }) => {
  return <FeedCard feedData={feed.article} />;
};

export const getStaticProps: GetStaticProps<SingleFeedPageProps> = async (
  context
) => {
  const { slug } = context.params!;

  const singlePost = await fetch(
    `https://api.realworld.io/api/articles/${slug}`
  );

  const feed: SingleFeedType = await singlePost.json();

  return {
    props: {
      feed,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SingleFeedPage;
