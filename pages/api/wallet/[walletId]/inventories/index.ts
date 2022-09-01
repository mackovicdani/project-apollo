import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import getHandler from "../../../../../lib/handler";

import dbConnect from "../../../../../lib/mongoosedb";
import { Inventory } from "../../../../../models/inventory.model";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  .post(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const inventory = req.body.inventory as Inventory;
    await dbConnect();
    try {
      const addedInventory = await WalletModel.addInventory(
        walletId,
        inventory
      );

      CustomResponse(res, 201, "New inventory added!", addedInventory);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    await dbConnect();
    const walletId = req.query.walletId as string;
    try {
      const inventories = await WalletModel.getAllInventories(walletId);
      CustomResponse(res, 200, undefined, inventories);
    } catch (error) {
      next(error);
    }
  });
