import auth from "../../../../../lib/auth";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import WalletModel, { AssignedUser } from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .put(async (req, res) => {
    const walletId = req.query.walletId as string;
    const assignedUser = req.body.assignedUser as AssignedUser;

    await dbConnect();
    try {
      const wallet = await WalletModel.addAssignedUser(walletId, assignedUser);

      res
        .status(201)
        .json({ message: "New user has been assigned to the wallet", wallet });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  })
  .get(async (req, res) => {
    const walletId = req.query.walletId as string;
    await dbConnect();
    try {
      const purchases = await WalletModel.getAllPurchases(walletId);

      return res.status(200).json({ purchases });
    } catch (error) {
      return res.status(502).json({ message: "Database errorr" });
    }
  });
