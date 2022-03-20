import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  let cookies = new Cookies(req, res, { keys: ["token"] });
  let bearerToken = cookies.get("token", { signed: true });

  const { body } = req;

  const bodyData = JSON.parse(body.id);

  try {
    const deleteComment = await fetch(
      `https://api.realworld.io/api/articles/${bodyData.slug}/comments/${body.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "Origin",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    console.log(deleteComment);

    const isDeleted = await deleteComment.json();

    console.log("server", isDeleted);

    if (isDeleted) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(false);
  }
}
