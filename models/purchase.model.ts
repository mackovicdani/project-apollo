import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
import { Inventory } from "./inventory.model";
import { Item } from "./item.model";
import { Store } from "./store.model";
import { User } from "./user.model";

export class Purchase {
  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ default: new Date() })
  public date: Date;

  @prop({ default: null, ref: () => Store })
  public store: Ref<Store>;

  @prop({ ref: () => Inventory })
  public inventory: Ref<Inventory>;

  @prop({ type: () => Item })
  public items: Item[];

  @prop({ default: 0 })
  public price: number;
}
