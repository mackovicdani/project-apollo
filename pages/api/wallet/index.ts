import auth from "../../../lib/auth";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import WalletModel from "../../../models/wallet.model";

var mongoose = require("mongoose");

export default getHandler()
  .use(auth)
  .post(async (req, res) => {
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

      res.status(201).json({ message: "New wallet added!", wallet });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  })
  .get(async (req, res) => {
    await dbConnect();
    try {
      const wallets = await WalletModel.getAllWallets(req.userId!);
      return res.status(200).json({ wallets });
    } catch (error) {
      return res.status(502).json({ message: "Database error" });
    }
  });
