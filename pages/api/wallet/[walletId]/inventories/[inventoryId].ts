import auth from "../../../../../lib/auth";
import CustomResponse from "../../../../../lib/customResponse";
import getHandler from "../../../../../lib/handler";
import dbConnect from "../../../../../lib/mongoosedb";
import { Inventory } from "../../../../../models/inventory.model";
import WalletModel from "../../../../../models/wallet.model";

export default getHandler()
  .use(auth)
  //.use(permissions)
  .put(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const inventoryId = req.query.inventoryId as string;
    const inventory = req.body.inventory as Inventory;

    await dbConnect();
    try {
      const editedInventory = await WalletModel.editInventoryById(
        walletId,
        inventoryId,
        inventory
      );
      CustomResponse(res, 200, "Inventory updated!", editedInventory);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const inventoryId = req.query.inventoryId as string;
    await dbConnect();
    try {
      const inventory = await WalletModel.getInventoryById(
        walletId,
        inventoryId
      );
      CustomResponse(res, 200, undefined, inventory);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const walletId = req.query.walletId as string;
    const inventoryId = req.query.inventoryId as string;
    await dbConnect();
    try {
      const inventory = await WalletModel.deleteInventoryById(
        walletId,
        inventoryId
      );
      CustomResponse(res, 200, "Inventory deleted", inventory);
    } catch (error) {
      next(error);
    }
  });
