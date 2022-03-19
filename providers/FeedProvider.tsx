import React, { useCallback, useContext, useMemo } from "react";

export type FeedItemProps = {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favourited: boolean;
  favoritesCount: number;
  author: AuthorType;
};

type AuthorType = {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
};

type FeedListType = {
  articles: FeedItemProps[];
  articleCount: number;
};

export type SingleFeedType = {
  article: FeedItemProps;
};

export type CommentListType = {
  comments: CommentDetailType[];
};

type CommentDetailType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: AuthorType;
};

export type FeedContextProps = {
  getFeedList: (limit: string, offset: string) => Promise<FeedListType>;
  getFeedComments: (slug: string) => Promise<CommentListType["comments"]>;
};

const FeedContext = React.createContext({} as FeedContextProps);
export const useFeed = () => useContext(FeedContext);
export const FeedProvider: React.FC = (props) => {
  const getFeedList = useCallback(async (limit: string, offset: string) => {
    const feedsPromise = await fetch(
      `https://api.realworld.io/api/articles?limit=${limit}&offset=${offset}`
    );

    const articles: FeedListType = await feedsPromise.json();
    return articles;
  }, []);

  const getFeedComments = useCallback(async (slug: string) => {
    const commentsPromise = await fetch(
      `https://api.realworld.io/api/articles/${slug}/comments`
    );

    const comments: CommentListType = await commentsPromise.json();

    return comments.comments;
  }, []);

  const value = useMemo<FeedContextProps>(() => {
    return {
      getFeedList,
      getFeedComments,
    };
  }, [getFeedList, getFeedComments]);
  return (
    <FeedContext.Provider value={value}>{props.children}</FeedContext.Provider>
  );
};
