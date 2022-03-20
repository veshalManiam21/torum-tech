import type { CommentListType } from "@/providers/FeedProvider";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentListType>
) {
  try {
    const commentsPromise = await fetch(
      `https://api.realworld.io/api/articles/${req.body}/comments`,
      {
        method: "GET",
      }
    );

    const comments: CommentListType = await commentsPromise.json();

    if (comments) {
      res.status(200).json(comments);
    } else {
      res.status(400);
    }
  } catch {
    res.status(400);
  }
}
