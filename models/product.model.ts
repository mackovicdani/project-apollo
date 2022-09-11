import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Store } from "./store.model";

export class Product {
  @prop({ required: [true, "Please provide a product name!"] })
  public name: string;

  @prop({ required: [true, "Please provide a type!"] })
  public type: string;

  @prop({ required: [true, "Please provide a category!"] })
  public category: string;

  @prop({ default: 1 })
  public packageSize: number;

  @prop({ required: [true, "Please provide a quantity type!"] })
  public quantityType: string;

  @prop({ default: 0 })
  public price: number;

  @prop({ default: null, ref: () => Store })
  public origin: Ref<Store>[];

  public static async createProduct(
    this: ReturnModelType<typeof Product>,
    product: Product
  ) {
    return await this.create(product);
  }

  public static async updateProductById(
    this: ReturnModelType<typeof Product>,
    productId: string,
    product: Product
  ) {
    return await this.findByIdAndUpdate(
      productId,
      {
        name: product.name,
        type: product.type,
        category: product.category,
        packageSize: product.packageSize,
        quantityType: product.quantityType,
        price: product.price,
        origin: product.origin,
      },
      { new: true }
    );
  }

  public static async getProductById(
    this: ReturnModelType<typeof Product>,
    productId: string
  ) {
    return await this.findById(productId);
  }

  public static async getAllProducts(this: ReturnModelType<typeof Product>) {
    return await this.find({});
  }

  public static async deleteProductById(
    this: ReturnModelType<typeof Product>,
    productId: string
  ) {
    return await this.findByIdAndDelete(productId);
  }

  public static async addStoreToProductWithId(
    this: ReturnModelType<typeof Product>,
    productId: string,
    storeId: string
  ) {
    await this.findByIdAndUpdate(
      productId,
      {
        $push: {
          origin: {
            _id: storeId,
          },
        },
      },
      { new: true }
    );
  }

  public static async RemoveStoreFromProducts(storeId: string) {
    const products = await ProductModel.getAllProducts();
    products.forEach((product: any) => {
      ProductModel.removeStoreFromProductWithId(product._id, storeId);
    });
  }

  public static async removeStoreFromProductWithId(
    this: ReturnModelType<typeof Product>,
    productId: string,
    storeId: string
  ) {
    await this.findByIdAndUpdate(
      productId,
      {
        $pull: {
          origin: { $in: storeId },
        },
      },
      { multi: true, new: true }
    );
  }
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
