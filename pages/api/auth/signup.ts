import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email, password, wallet } = req.body;
    await dbConnect();
    try {
      const user = await UserModel.create({
        name,
        email,
        password,
        wallet,
      });

      res.status(201).json({ message: "User successfully created", user });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  } else {
    res.status(405).json({ message: "We only support POST" });
  }
}
