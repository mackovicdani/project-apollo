import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import ProductModel from "../../../models/product.model";
import StoreModel, { Store } from "../../../models/store.model";

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    const storeId = req.query.storeId as string;
    await dbConnect();
    try {
      const store = await StoreModel.getStoreById(storeId);
      CustomResponse(res, 200, undefined, store);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    const storeId = req.query.storeId as string;
    const store = req.body.store as Store;
    await dbConnect();
    try {
      const updatedStore = await StoreModel.updateStoreById(storeId, store);
      CustomResponse(res, 200, "Store modified successfully!", updatedStore);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const storeId = req.query.storeId as string;
    await dbConnect();
    try {
      const store = await StoreModel.deleteStoreById(storeId);
      if (store) {
        await ProductModel.RemoveStoreFromProducts(storeId);
      }
      CustomResponse(res, 200, "Store successfully deleted", store);
    } catch (error) {
      next(error);
    }
  });
