import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { Product } from "./product.model";

export class Item {
  @prop({ default: null, ref: () => Product })
  public product: Ref<Product>;

  @prop({ default: 0 })
  public quantity: number;

  @prop({ default: 0 })
  public price: number;

  @prop()
  public changed: boolean;
}
