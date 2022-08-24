import WalletModel from "../models/wallet.model";
import ErrorResponse from "./errorResponse";
import dbConnect from "./mongoosedb";

export default async function permissions(req: any, res: any, next: any) {
  await dbConnect();
  try {
    const wallet = await WalletModel.findById(req.query.walletId)
      .where("assignedUsers.user")
      .equals(req.userId);
    if (!wallet) {
      throw new ErrorResponse("No permission", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
}
