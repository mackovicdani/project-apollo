import auth from "../../../../../lib/auth";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .delete(async (req, res) => {
    const walletId = req.query.walletId as string;
    const userId = req.query.userId as string;
    await dbConnect();
    try {
      const wallet = await WalletModel.deleteAssignedUserById(walletId, userId);

      if (!wallet?.errors) {
        return res
          .status(201)
          .json({ message: "Assigned user deleted", wallet });
      } else {
        return res.status(406).json({ message: wallet.errors });
      }
    } catch (error) {
      console.log(error);
      return res.status(406).json({ message: error });
    }
  });
