import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import WalletModel from "../../../models/wallet.model";

var mongoose = require("mongoose");

export default getHandler()
  .use(auth)
  .post(async (req, res, next) => {
    const name = req.body.name as string;
    await dbConnect();
    try {
      const wallet = await WalletModel.createWallet({
        name,
        assignedUsers: [
          { user: mongoose.Types.ObjectId(req.userId), money: 0 },
        ],
        purchases: [],
      });

      CustomResponse(res, 201, "New wallet added!", wallet);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    await dbConnect();
    try {
      const wallets = await WalletModel.getAllWallets(req.userId!);
      CustomResponse(res, 200, undefined, wallets);
    } catch (error) {
      next(error);
    }
  });
