import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";
const cookie = require("cookie");

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    await dbConnect();
    try {
      if (!email || !password)
        res
          .status(400)
          .json({ message: "Please provide an email and password" });

      const user = await UserModel.findOne({ email }).select("+password");

      if (!user) res.status(401).json({ message: "Invalid Credentials" });

      const isMatch = await user?.matchPasswords(password);

      if (!isMatch) {
        res.status(200).json({ message: "Invalid Credentials" });
      }
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", user?.getSignToken(), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 3600,
          path: "/",
        })
      );
      res.json({ message: "Welcome back to the app!" });
    } catch (error) {
      res.status(502).json({ message: "Database error" });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
