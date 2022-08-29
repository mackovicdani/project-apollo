import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import ProductModel, { Product } from "../../../models/product.model";

export default getHandler()
  .use(auth)
  .put(async (req, res, next) => {
    await dbConnect();
    try {
      const product = await ProductModel.createProduct(req.body as Product);
      CustomResponse(res, 201, "New product added!", product);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    await dbConnect();
    try {
      const products = await ProductModel.getAllProducts();
      CustomResponse(res, 200, undefined, products);
    } catch (error) {
      next(error);
    }
  });
