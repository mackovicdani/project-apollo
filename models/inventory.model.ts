import { prop } from "@typegoose/typegoose";
import { Item } from "./item.model";

export class Inventory {
  @prop({ default: "" })
  public name: string;

  @prop({ default: null, type: () => Item })
  public items: Item[];
}
