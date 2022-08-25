import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";

export default getHandler().post(async (req, res, next) => {
  const { name, email, password } = req.body;
  await dbConnect();
  try {
    await UserModel.create({
      name,
      email,
      password,
    });

    CustomResponse(res, 201, "User successfully created");
  } catch (error) {
    next(error);
  }
});
