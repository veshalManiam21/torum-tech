import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<boolean>
) {
  let cookies = new Cookies(req, res, { keys: ["token"] });
  let bearerToken = cookies.get("token", { signed: true });

  const { body } = req;

  const bodyData = JSON.parse(body);

  console.log(bodyData, JSON.stringify(bodyData.comment));

  try {
    const submitComment = await fetch(
      `https://api.realworld.io/api/articles/${bodyData.slug}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "Origin",
          Authorization: `Bearer ${bearerToken}`,
        },
        body: JSON.stringify({ comment: bodyData.comment }),
      }
    );

    const isSubmitted = await submitComment.json();

    console.log(isSubmitted);

    if (isSubmitted) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (error) {
    console.log(error);
    res.status(404).json(false);
  }
}
