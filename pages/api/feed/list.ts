import type { FeedListType } from "@/providers/FeedProvider";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FeedListType>
) {
  try {
    const feed = await fetch(
      `https://api.realworld.io/api/articles?limit=10&offset=0`,
      {
        method: "GET",
      }
    );

    const feedList: FeedListType = await feed.json();

    if (feedList) {
      res.status(200).json(feedList);
    } else {
      res.status(400);
    }
  } catch {
    res.status(400);
  }
}
