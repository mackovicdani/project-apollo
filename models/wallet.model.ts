import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class AssignedUser {
  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ default: 0 })
  public money: number;
}

export class Purchase {
  @prop({ ref: () => User })
  public user: Ref<User>;

  @prop({ default: new Date() })
  public date: Date;

  @prop({ default: 0 })
  public price: number;
}

export class Wallet {
  @prop({ type: () => AssignedUser })
  public assignedUsers: AssignedUser[];

  @prop({ type: () => Purchase })
  public purchases: Purchase[];

  //api/wallet/
  public static async createWallet(
    this: ReturnModelType<typeof Wallet>,
    wallet: Wallet
  ) {
    return await (
      await this.create(wallet)
    ).populate("assignedUsers.user", "email name");
  }

  public static async getAllWallets(this: ReturnModelType<typeof Wallet>) {
    return await this.find({})
      .populate("assignedUsers.user", "name email")
      .populate("purchases.user", "name email");
  }

  //api/wallet/[walletId]/
  public static async getWalletById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string
  ) {
    const wallet = await this.findById(walletId).populate(
      "assignedUsers.user",
      "name email"
    );
    return wallet;
  }

  public static async deleteWalletById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string
  ) {
    return await this.findByIdAndDelete(walletId);
  }

  //api/wallet/[walletId]/users/
  public static async addAssignedUser(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    assignedUser: AssignedUser
  ) {
    return await this.findByIdAndUpdate(
      walletId,
      {
        $push: {
          assignedUsers: assignedUser,
        },
      },
      { new: true }
    )
      .populate("assignedUsers.user", "name email")
      .select("-purchases");
  }

  public static async getAllAssignedUser(
    this: ReturnModelType<typeof Wallet>,
    id: string
  ) {
    const wallet = await this.findById(id)
      .select("purchases -_id")
      .populate("purchases.user", "name email")
      .exec();
    return wallet?.purchases;
  }

  //api/wallet/[walletId]/users/[userId]
  public static async deleteAssignedUserById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    assignedUser: string
  ) {
    return await this.findByIdAndUpdate(
      walletId,
      {
        $pull: {
          assignedUsers: assignedUser,
        },
      },
      { new: true }
    )
      .populate("assignedUsers.user", "name email")
      .select("-purchases");
  }
}

const WalletModel = getModelForClass(Wallet);

export default WalletModel;
