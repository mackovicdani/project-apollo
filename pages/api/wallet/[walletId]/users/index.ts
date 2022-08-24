import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import ErrorResponse from "../../../../../lib/errorResponse";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import permissions from "../../../../../lib/permissions";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .put(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const inviteLink = req.body.inviteLink as string;
    if (!inviteLink) {
      throw new ErrorResponse("Please provide an invite link", 400);
    }

    await dbConnect();
    try {
      const wallet = await WalletModel.addAssignedUser(
        walletId,
        req.userId!,
        inviteLink
      );

      CustomResponse(res, 200, undefined, wallet);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    await dbConnect();
    try {
      const users = await WalletModel.getAllAssignedUser(walletId);

      CustomResponse(res, 200, undefined, users);
    } catch (error) {
      next(error);
    }
  });
