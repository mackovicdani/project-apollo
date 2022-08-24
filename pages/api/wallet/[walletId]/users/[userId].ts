import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import permissions from "../../../../../lib/permissions";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .delete(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const userId = req.query.userId as string;
    await dbConnect();
    try {
      const wallet = await WalletModel.deleteAssignedUserById(walletId, userId);

      CustomResponse(res, 200, "Assigned user deleted", wallet);
    } catch (error) {
      next(error);
    }
  });
