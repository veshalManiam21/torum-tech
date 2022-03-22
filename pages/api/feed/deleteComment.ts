import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  let cookies = await new Cookies(req, res, { keys: ["token"] });
  let bearerToken = await cookies.get("token", { signed: true });

  const { body } = await req;

  const bodyData = await JSON.parse(body);

  try {
    const deleteComment = await fetch(
      `https://api.realworld.io/api/articles/${
        bodyData.slug
      }/comments/${bodyData.id.toString()}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "Origin",
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    const isDeleted = await deleteComment.ok;

    if (isDeleted) {
      res.status(200).json(true);
    } else {
      res.status(400).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(false);
  }
}
