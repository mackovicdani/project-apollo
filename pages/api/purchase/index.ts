import auth from "../../../lib/auth";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import PurchaseModel from "../../../models/purchase.model";
import UserModel from "../../../models/user.model";

export default getHandler()
  .use(auth)
  .put(async (req, res) => {
    const { userId, date, price } = req.body;
    await dbConnect();
    const user = await UserModel.findOne({ userId }).select("_id");
    //TODO: Figure out why wallet can't be added
    try {
      const purchase = await PurchaseModel.create({
        user,
        date,
        price,
      });

      res.status(201).json({ message: "New purchase added!", purchase });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  });
