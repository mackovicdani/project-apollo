import auth from "../../../../../lib/auth";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import permissions from "../../../../../lib/permissions";
import WalletModel, { Purchase } from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .put(async (req, res) => {
    const walletId = req.query.walletId as string;
    const purchase = req.body.purchase as Purchase;

    await dbConnect();
    try {
      const wallet = await WalletModel.addPurchase(walletId, purchase);

      res.status(201).json({ message: "New purchase added to wallet", wallet });
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
