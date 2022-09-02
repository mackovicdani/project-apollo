import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    try {
      await dbConnect();
      const user = await UserModel.findById(req.userId).select("-id");
      CustomResponse(res, 200, "Welcome back", user);
    } catch (error) {
      next(error);
    }
  });
