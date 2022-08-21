import auth from "../../../../../lib/auth";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .get(async (req, res) => {
    const walletId = req.query.walletId as string;
    const purchaseId = req.query.purchaseId as string;
    await dbConnect();
    try {
      const purchase = await WalletModel.getPurchaseById(walletId, purchaseId);

      res.status(201).json({ message: "Success", purchase });
    } catch (error) {
      res.status(406).json({ message: error });
    }
  })
  .delete(async (req, res) => {
    const walletId = req.query.walletId as string;
    const purchaseId = req.query.purchaseId as string;
    await dbConnect();
    try {
      const purchase = await WalletModel.deletePurchaseById(
        walletId,
        purchaseId
      );

      return res.status(201).json({ message: "Purchase deleted", purchase });
    } catch (error) {
      console.log(error);
      return res.status(406).json({ message: error });
    }
  });
