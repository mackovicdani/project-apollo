import type { Ref } from "@typegoose/typegoose";
import { prop } from "@typegoose/typegoose";
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
}
