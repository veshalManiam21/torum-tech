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
import { LoadingIndicator } from "@/components/LoadingIndicator/LoadingIndicator";

export type FeedCardProps = {
  feedData: FeedItemProps;
};

export const FeedCard: React.FC<FeedCardProps> = ({ feedData }) => {
  const { getFeedComments } = useFeed();
  const [commentsData, setCommentsData] = useState<CommentListType["comments"]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  const getCommentData = useCallback(async () => {
    const commentData = await getFeedComments(feedData.slug);
    await setCommentsData(commentData);
    await setIsLoading(true);
  }, [getFeedComments, feedData.slug]);

  useEffect(() => {
    if (!isLoading) {
      getCommentData();
    }
  }, [getCommentData, isLoading]);

  return (
    <div className="px-4 py-3 space-y-2 rounded-lg max-w-2xl m-auto bg-black-0d0f14">
      {/* Card header */}
      <FeedHeader
        title={feedData.title}
        createdAt={feedData.createdAt}
        desc={feedData.description}
        user={{
          ...feedData.author,
          isFollowing: feedData.author.following,
          name: feedData.author.username,
        }}
        slug={feedData.slug}
      />
      {/* Card Body */}
      <div className="space-y-2">
        <FeedBody body={feedData.body} />
        <FeedTags tags={feedData.tagList} />
      </div>

      {/* Card Actions */}
      <FeedActions
        favourite={{
          count: feedData.favoritesCount,
          isFav: feedData.favourited,
        }}
        comments={{
          count: commentsData.length,
        }}
      />
      {/* User Comment Box */}
      <div className="py-2 border-b border-black-07080b">
        <FeedUserInput slug={feedData.slug} setCommentsData={setCommentsData} />
      </div>

      {/* Comments */}
      {commentsData.length ? (
        commentsData.map((comment, idx) => (
          <FeedComments key={idx} comments={comment} slug={feedData.slug} />
        ))
      ) : (
        <LoadingIndicator className="w-24 h-24" />
      )}
    </div>
  );
};
