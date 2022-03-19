import React, { useCallback, useEffect, useState } from "react";

import {
  CommentListType,
  FeedItemProps,
  useFeed,
} from "@/providers/FeedProvider";
import { FeedActions } from "@/components/Feed//FeedActions/FeedActions";
import { FeedUserInput } from "@/components/Feed/FeedUserInput/FeedUserInput";
import { FeedHeader } from "@/components/Feed//FeedHeader/FeedHeader";
import { FeedBody } from "@/components/Feed//FeedBody/FeedBody";
import { FeedComments } from "../FeedComments/FeedComments";
import { FeedTags } from "../FeedTags/FeedTags";

export type FeedCardProps = {
  articleData: FeedItemProps;
};

export const FeedCard: React.FC<FeedCardProps> = ({ articleData }) => {
  const { getFeedComments } = useFeed();
  const [commentsData, setCommentsData] = useState<CommentListType["comments"]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const getCommentData = useCallback(async () => {
    const commentData = await getFeedComments(articleData.slug);
    await setCommentsData(commentData);
    await setIsLoading(true);
  }, [getFeedComments, articleData.slug]);

  useEffect(() => {
    if (!isLoading) {
      getCommentData();
    }
  }, [getCommentData, isLoading]);

  return (
    <div className="px-4 py-3 space-y-2 rounded-lg max-w-2xl m-auto bg-black-0d0f14">
      {/* Card header */}
      <FeedHeader
        title={articleData.title}
        createdAt={articleData.createdAt}
        desc={articleData.description}
        user={{
          ...articleData.author,
          isFollowing: articleData.author.following,
          name: articleData.author.username,
        }}
      />
      {/* Card Body */}
      <div className="space-y-2">
        <FeedBody body={articleData.body} />
        <FeedTags tags={articleData.tagList} />
      </div>

      {/* Card Actions */}
      <FeedActions
        favourite={{
          count: articleData.favoritesCount,
          isFav: articleData.favourited,
        }}
        comments={{
          count: commentsData.length,
        }}
      />
      {/* User Comment Box */}
      <div className="py-2 border-b border-black-07080b">
        <FeedUserInput slug={articleData.slug} />
      </div>

      {/* Comments */}
      {commentsData.length &&
        commentsData.map((comment, idx) => (
          <FeedComments key={idx} comments={comment} />
        ))}
    </div>
  );
};
