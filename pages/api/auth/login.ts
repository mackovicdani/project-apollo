import CustomResponse from "../../../lib/customResponse";
import ErrorResponse from "../../../lib/errorResponse";
import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";
const cookie = require("cookie");

export default getHandler().post(async (req, res, next) => {
  const { email, password } = req.body;
  await dbConnect();
  try {
    if (!email || !password)
      throw new ErrorResponse("Please provide an email and password", 400);

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) throw new ErrorResponse("Invalid Credentials", 401);

    const isMatch = await user?.matchPasswords(password);
    if (!isMatch) throw new ErrorResponse("Invalid Credentials", 401);

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth", user?.getSignToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
    );
    CustomResponse(res, 200, `Welcome back to the app ${user.name}`);
  } catch (error: any) {
    next(error);
  }
});
