import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Purchase } from "./purchase.model";
import { User } from "./user.model";

export class Transaction {
  @prop({ ref: () => User })
  public sender?: Ref<User>;

  @prop({ ref: () => User })
  public recipient?: Ref<User>;

  @prop()
  public amount: number;

  @prop({ ref: () => Purchase })
  public purchase?: Ref<Purchase>;

  public static async createTransaction(
    this: ReturnModelType<typeof Transaction>,
    transaction: Transaction
  ) {
    return await this.create(transaction);
  }
}

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;
