import { CommentButton } from "@/components/CommentButton/CommentButton";
import { LikeButton } from "@/components/LikeButton/LikeButton";
import React from "react";

export type FeedActionsProps = {
  favourite: {
    count: number;
    isFav: boolean;
  };
  comments?: {
    count: number;
  };
};

export const FeedActions: React.FC<FeedActionsProps> = ({
  favourite,
  comments,
}) => {
  return (
    <div className="flex items-center space-x-6 pl-1 pr-4 py-2 border-b border-black-07080b">
      <LikeButton isFollowing={favourite.isFav} showCount={favourite.count} />
      <CommentButton totalCommentCount={comments?.count} />
    </div>
  );
};
