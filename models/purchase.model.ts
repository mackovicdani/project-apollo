import type { Ref } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Purchase {
  @prop({ ref: () => User })
  public user?: Ref<User>;

  @prop({ default: new Date() })
  public date: Date;

  @prop({ default: 0 })
  public price: number;
}

const PurchaseModel = getModelForClass(Purchase);

export default PurchaseModel;
