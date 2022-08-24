import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import permissions from "../../../../../lib/permissions";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const purchaseId = req.query.purchaseId as string;
    await dbConnect();
    try {
      const purchase = await WalletModel.getPurchaseById(walletId, purchaseId);
      CustomResponse(res, 200, undefined, purchase);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const purchaseId = req.query.purchaseId as string;
    await dbConnect();
    try {
      const purchase = await WalletModel.deletePurchaseById(
        walletId,
        purchaseId
      );
      CustomResponse(res, 200, "Purchase deleted", purchase);
    } catch (error) {
      next(error);
    }
  });
