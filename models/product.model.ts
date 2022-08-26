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
  public static async getAllProducts(this: ReturnModelType<typeof Product>) {
    return await this.find({});
  }
}

const ProductModel = getModelForClass(Product);

export default ProductModel;
