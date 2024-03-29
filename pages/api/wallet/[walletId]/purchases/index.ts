import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import permissions from "../../../../../lib/permissions";
import { Purchase } from "../../../../../models/purchase.model";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .put(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const purchase = req.body as Purchase;

    await dbConnect();
    try {
      const wallet = await WalletModel.addPurchase(
        walletId,
        req.userId!,
        purchase
      );
      CustomResponse(res, 201, "New purchase added to the wallet", wallet);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    await dbConnect();
    try {
      const purchases = await WalletModel.getAllPurchases(walletId);
      CustomResponse(res, 200, undefined, purchases);
    } catch (error) {
      next(error);
    }
  });
