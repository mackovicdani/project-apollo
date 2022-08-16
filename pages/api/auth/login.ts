import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";
const cookie = require("cookie");

export default getHandler().post(async (req, res) => {
  const { email, password } = req.body;
  await dbConnect();
  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please provide an email and password" });

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) return res.status(401).json({ message: "Invalid Credentials" });

    const isMatch = await user?.matchPasswords(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Credentials" });

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
    return res.json({
      message: "Welcome back to the app!",
      user: user,
    });
  } catch (error) {
    return res.status(502).json({ message: "Database error" });
  }
});
