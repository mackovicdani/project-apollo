import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import StoreModel, { Store } from "../../../models/store.model";

export default getHandler()
  .use(auth)
  .put(async (req, res, next) => {
    await dbConnect();
    try {
      const store = await StoreModel.createStore(req.body as Store);
      CustomResponse(res, 201, "New Store added!", store);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    await dbConnect();
    try {
      const stores = await StoreModel.getAllStores();
      CustomResponse(res, 200, undefined, stores);
    } catch (error) {
      next(error);
    }
  });
