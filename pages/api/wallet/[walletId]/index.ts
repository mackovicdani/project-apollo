import auth from "../../../../lib/auth";
import getHandler from "../../../../lib/handler";
import dbConnect from "../../../../lib/mongoosedb";
import WalletModel from "../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .get(async (req, res) => {
    const walletId = req.query.walletId as string;

    await dbConnect();
    try {
      const wallet = await WalletModel.getWalletById(walletId);

      res.status(201).json({ message: "Success", wallet });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  })
  .delete(async (req, res) => {
    const walletId = req.query.walletId as string;

    await dbConnect();
    try {
      const wallet = await WalletModel.deleteWalletById(walletId);

      res.status(201).json({ message: "Wallet successfully deleted" });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  });