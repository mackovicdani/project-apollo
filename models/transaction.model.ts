import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Purchase } from "./purchase.model";
import { User } from "./user.model";

const Wallet = require("./wallet.model");

export class Transaction {
  @prop({ required: [true, "Please provide a description!"] })
  public desc: string;

  @prop({ default: new Date() })
  public date: Date;

  @prop({ required: [true, "Please provide a sender!"], ref: () => User })
  public sender: Ref<User>;

  @prop({ required: [true, "Please provide a recipient!"], ref: () => User })
  public recipient: Ref<User>;

  @prop({ required: [true, "Please provide a amount!"] })
  public amount: number;

  @prop({
    required: [true, "Please provide a wallet!"],
    ref: () => typeof Wallet,
  })
  public wallet: Ref<typeof Wallet>;

  @prop({ ref: () => Purchase })
  public purchase: Ref<Purchase>;

  public static async createTransaction(
    this: ReturnModelType<typeof Transaction>,
    transaction: any,
    wallet: typeof Wallet
  ) {
    wallet.assignedUsers.forEach(
      (assignedUser: any, index: number, array: any[]) => {
        if (transaction.recipient.toString() == assignedUser.user.toString()) {
          array[index].money += transaction.amount;
        }
      }
    );

    return { transaction: await this.create(transaction), wallet };
  }
}

const TransactionModel = getModelForClass(Transaction);

export default TransactionModel;
