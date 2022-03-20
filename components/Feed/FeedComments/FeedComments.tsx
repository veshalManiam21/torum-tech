import { CommentListType } from "@/providers/FeedProvider";
import React from "react";
import { FeedHeader } from "../FeedHeader/FeedHeader";

export type FeedCommentsProps = {
  comments: CommentListType["comments"][0];
  slug: string;
};

export const FeedComments: React.FC<FeedCommentsProps> = ({
  comments,
  slug,
}) => {
  return (
    <>
      <FeedHeader
        createdAt={comments.createdAt}
        user={{
          ...comments.author,
          isFollowing: comments.author.following,
          name: comments.author.username,
        }}
        body={comments.body}
        id={comments.id}
        slug={slug}
      />
    </>
  );
};
