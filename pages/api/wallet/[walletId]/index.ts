import auth from "../../../../lib/auth";
import CustomResponse from "../../../../lib/customResponse";
import getHandler from "../../../../lib/handler";
import dbConnect from "../../../../lib/mongoosedb";
import permissions from "../../../../lib/permissions";
import WalletModel from "../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;

    await dbConnect();
    try {
      const wallet = await WalletModel.getWalletById(walletId);

      CustomResponse(res, 201, undefined, wallet);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const walletId = req.query.walletId as string;

    await dbConnect();
    try {
      const wallet = await WalletModel.deleteWalletById(walletId);
      CustomResponse(res, 200, "Wallet successfully deleted", wallet);
    } catch (error) {
      next(error);
    }
  });
