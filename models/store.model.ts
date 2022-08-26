import { prop } from "@typegoose/typegoose";

export class Store {
  @prop({ default: "" })
  public name: string;

  @prop({ default: "" })
  public location: string;

  @prop({ default: 0 })
  public distance: number;

  @prop({ default: "" })
  public openHours: string;
}
