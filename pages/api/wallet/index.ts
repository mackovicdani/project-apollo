import auth from "../../../lib/auth";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import WalletModel, { AssignedUser } from "../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .post(async (req, res) => {
    const assignedUsers = req.body.assignedUsers as AssignedUser[];
    await dbConnect();
    try {
      const wallet = await WalletModel.createWallet({
        assignedUsers,
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
      const wallets = await WalletModel.getAllWallets();
      return res.status(200).json({ wallets });
    } catch (error) {
      return res.status(502).json({ message: "Database error" });
    }
  });
