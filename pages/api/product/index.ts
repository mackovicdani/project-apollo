import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import ProductModel, { Product } from "../../../models/product.model";

export default getHandler()
  .use(auth)
  .put(async (req, res, next) => {
    const product = req.body as Product;
    await dbConnect();
    try {
      const newProduct = await ProductModel.createProduct(product);
      CustomResponse(res, 201, "New product added!", newProduct);
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
