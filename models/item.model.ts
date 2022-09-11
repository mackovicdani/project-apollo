import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { Product } from "./product.model";

export class Item {
  @prop({ required: [true, "Please provide a product!"], ref: () => Product })
  public product: Ref<Product>;

  @prop({ default: 1 })
  public quantity: number;

  @prop({ required: [true, "Please provide a price!"] })
  public price: number;

  @prop()
  public changed: boolean;
}
