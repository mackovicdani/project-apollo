import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import TransactionModel from "../../../models/transaction.model";

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    await dbConnect();
    try {
      const transactions = await TransactionModel.find({
        $or: [{ sender: req.userId }, { recipient: req.userId }],
      })
        .populate("sender", "name email")
        .populate("recipient", "name email");
      CustomResponse(res, 200, undefined, transactions);
    } catch (error) {
      next(error);
    }
  });
