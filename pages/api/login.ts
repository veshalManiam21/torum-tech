// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Login, User } from "@/providers/AuthProvider";
import Cookies from "cookies";
import type { NextApiRequest, NextApiResponse } from "next";
import { Except } from "type-fest";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Except<User, "token">>
) {
  var cookies = new Cookies(req, res, { keys: ["token"] });

  try {
    const login = await fetch("https://api.realworld.io/api/users/login", {
      method: "POST",
      credentials: "include", // if login is successful will store cookie to jwet
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "Origin",
      },
      body: req.body,
    });

    const userData: { user: User } = await login.json();

    cookies.set("token", userData.user.token, { signed: true });

    if (Object.keys(userData.user).length) {
      res.status(200).json({
        bio: userData.user.bio,
        email: userData.user.email,
        image: userData.user.image,
        username: userData.user.username,
      });
    } else {
      res.status(404);
    }
  } catch (err) {
    console.log(err);
    res.status(404);
  }
}
