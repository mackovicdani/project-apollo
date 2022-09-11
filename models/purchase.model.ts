import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { Item } from "./item.model";
import { Store } from "./store.model";
import { User } from "./user.model";

export class Purchase {
  @prop({ required: [true, "Please provide a user!"], ref: () => User })
  public user: Ref<User>;

  @prop({ default: new Date() })
  public date: Date;

  @prop({ default: null, ref: () => Store })
  public store: Ref<Store>;

  @prop({ required: [true, "Please provide items!"], type: () => Item })
  public items: Item[];

  @prop({ required: [true, "Please provide a price!"] })
  public price: number;
}
