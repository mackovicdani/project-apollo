import {
  getModelForClass,
  prop,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { Store } from "./store.model";

export class Product {
  @prop({ default: "" })
  public name: string;

  @prop({ default: "" })
  public type: string;

  @prop({ default: "" })
  public category: string;

  @prop({ default: 0 })
  public packageSize: number;

  @prop({ default: "" })
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
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
