import auth from "../../../../lib/auth";
import CustomResponse from "../../../../lib/customResponse";
import getHandler from "../../../../lib/handler";
import dbConnect from "../../../../lib/mongoosedb";
import ProductModel, { Product } from "../../../../models/product.model";

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    const productId = req.query.productId as string;
    await dbConnect();
    try {
      const product = await ProductModel.getProductById(productId);
      CustomResponse(res, 200, undefined, product);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    await dbConnect();
    try {
      const productId = req.query.productId as string;
      const product = req.body as Product;
      const updatedProduct = await ProductModel.updateProductById(
        productId,
        product
      );
      CustomResponse(
        res,
        201,
        "Product modified successfully!",
        updatedProduct
      );
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const productId = req.query.productId as string;
    await dbConnect();
    try {
      const product = await ProductModel.deleteProductById(productId);
      CustomResponse(res, 200, "Product successfully deleted", product);
    } catch (error) {
      next(error);
    }
  });
