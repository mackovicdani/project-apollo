import auth from "../../../../lib/auth";
import CustomResponse from "../../../../lib/customResponse";
import getHandler from "../../../../lib/handler";
import dbConnect from "../../../../lib/mongoosedb";
import permissions from "../../../../lib/permissions";
import { Item } from "../../../../models/item.model";
import WalletModel from "../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .use(permissions)
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;

    await dbConnect();
    try {
      const wallet = await WalletModel.getWalletById(walletId);
      let items: Item[] = [];
      wallet?.inventory.map((category: any) => {
        category.items.map((item: Item) => {
          if (item.quantity > 0) items.push(item);
        });
      });

      CustomResponse(res, 201, undefined, items);
    } catch (error) {
      next(error);
    }
  });
