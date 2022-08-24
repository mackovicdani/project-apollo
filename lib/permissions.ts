import WalletModel from "../models/wallet.model";
import dbConnect from "./mongoosedb";

export default async function permissions(req: any, res: any, next: any) {
  await dbConnect();
  const wallet = await WalletModel.findById(req.query.walletId)
    .where("assignedUsers.user")
    .equals(req.userId);

  if (!wallet) {
    return res.status(403).json({ message: "No permission" });
  }
  next();
}
