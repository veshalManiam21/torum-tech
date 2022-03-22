import { FeedItemProps, useFeed } from "@/providers/FeedProvider";
import React, { useCallback, useEffect, useState } from "react";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { FeedCard } from "./FeedCard/FeedCard";

export type FeedProps = {};

export const Feed: React.FC<FeedProps> = (props) => {
  const { getFeedList } = useFeed();

  const [feedData, setfeedData] = useState<FeedItemProps[]>([]);

  const getData = useCallback(async () => {
    const feedData = await getFeedList();
    await setfeedData(feedData.articles);
  }, [getFeedList]);

  useEffect(() => {
    if (!feedData.length) {
      getData();
    }
  }, [feedData, getData]);

  return (
    <div className="container space-y-4">
      {feedData.length ? (
        feedData.map((article, idx) => (
          <FeedCard feedData={article} key={idx} />
        ))
      ) : (
        <LoadingIndicator className="w-24 h-24" />
      )}
    </div>
  );
};
