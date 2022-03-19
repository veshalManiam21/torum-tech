import { FeedItemProps, useFeed } from "@/providers/FeedProvider";
import React, { useCallback, useEffect, useState } from "react";
import { FeedCard } from "./FeedCard/FeedCard";

export type FeedProps = {};

export const Feed: React.FC<FeedProps> = (props) => {
  const { getFeedList } = useFeed();

  const [articleData, setArticleData] = useState<FeedItemProps[]>([]);

  const getData = useCallback(async () => {
    const articleData = await getFeedList("10", "0");
    await setArticleData(articleData.articles);
  }, [getFeedList]);
  // const data = getData();

  useEffect(() => {
    if (!articleData.length) {
      getData();
    }
  }, [articleData, getData]);

  return (
    <div className="container space-y-4">
      {articleData.length
        ? articleData.map((article, idx) => (
            <FeedCard articleData={article} key={idx} />
          ))
        : null}
    </div>
  );
};
