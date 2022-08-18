import type { Ref } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Purchase } from "./purchase.model";
import { User } from "./user.model";

export class Transaction {
  @prop({ ref: () => User })
  public sender?: Ref<User>;

  @prop({ ref: () => User })
  public recipient?: Ref<User>;

  @prop({ default: 0 })
  public amount: number;

  @prop({ ref: () => Purchase })
  public purchase?: Ref<Purchase>;
}

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;
