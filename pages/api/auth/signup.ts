import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import UserModel from "../../../models/user.model";

export default getHandler().post(async (req, res) => {
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
});
