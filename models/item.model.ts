import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { Product } from "./product.model";
import { User } from "./user.model";

export class quantityPerUser {
  @prop({ required: [true, "Please provide a user!"], ref: () => User })
  public user: Ref<User>;

  @prop({ required: true, default: 0 })
  public quantity: number;
}

export class Item {
  @prop({ required: [true, "Please provide a product!"], ref: () => Product })
  public product: Ref<Product>;

  @prop({ default: 1 })
  public quantity: number;

  @prop({ required: true, type: () => quantityPerUser })
  public quantityPerUser: quantityPerUser[];

  @prop({ required: [true, "Please provide a price!"] })
  public price: number;

  @prop()
  public changed: boolean;
}
