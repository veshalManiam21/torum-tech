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

export type FeedListType = {
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

type SubmitPostType = {
  slug: string;
  comment: {
    body: string;
  };
};

export type FeedContextProps = {
  getFeedList: () => Promise<FeedListType>;
  getFeedComments: (slug: string) => Promise<CommentListType["comments"]>;
  submitComment: (info: SubmitPostType) => Promise<boolean>;
  deleteComment: (slug: string, id: string) => Promise<boolean>;
};

const FeedContext = React.createContext({} as FeedContextProps);
export const useFeed = () => useContext(FeedContext);

export const FeedProvider: React.FC = (props) => {
  const getFeedList = useCallback(async () => {
    const feedsPromise = await fetch("/api/feed/list");

    const articles: FeedListType = await feedsPromise.json();
    return articles;
  }, []);

  const getFeedComments = useCallback(async (slug: string) => {
    const getComments = await fetch("/api/feed/getComments", {
      body: slug,
      method: "POST",
    });
    const comments: CommentListType = await getComments.json();
    return comments.comments;
  }, []);

  const submitComment = useCallback(async (info: SubmitPostType) => {
    try {
      const submitedComments = await fetch("/api/feed/postComment", {
        method: "POST",
        body: JSON.stringify(info),
      });

      const isSubmitted = await submitedComments.json();

      return isSubmitted ? true : false;
    } catch {
      return false;
    }
  }, []);

  const deleteComment = useCallback(async (slug: string, id: string) => {
    try {
      const deleteComment = await fetch("/api/feed/deleteComment", {
        method: "POST",
        body: JSON.stringify({
          slug,
          id,
        }),
      });

      const isDeleted = await deleteComment.json();

      return isDeleted;
    } catch {
      return false;
    }
  }, []);

  const value = useMemo<FeedContextProps>(() => {
    return {
      getFeedList,
      getFeedComments,
      submitComment,
      deleteComment,
    };
  }, [getFeedList, getFeedComments, submitComment, deleteComment]);
  return (
    <FeedContext.Provider value={value}>{props.children}</FeedContext.Provider>
  );
};
