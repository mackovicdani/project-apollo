import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import ErrorResponse from "../lib/errorResponse";
import { Item } from "./item.model";
import ProductModel from "./product.model";
import { Purchase } from "./purchase.model";
import TransactionModel from "./transaction.model";
import { User } from "./user.model";
var mongoose = require("mongoose");
const crypto = require("crypto");

export class AssignedUser {
  @prop({ required: [true, "Please provide a user!"], ref: () => User })
  public user: Ref<User>;

  @prop({ required: true, default: 0 })
  public money: number;
}

@pre<Wallet>("save", function () {
  this.inviteLink = crypto.randomBytes(20).toString("hex");
  return;
})
export class Wallet {
  @prop({ required: [true, "Please provide a name!"] })
  public name: string;

  @prop({ required: true, type: () => AssignedUser })
  public assignedUsers: AssignedUser[];

  @prop({ required: false, type: () => Purchase })
  public purchases: Purchase[];

  @prop({ default: null, type: () => Item })
  public inventory: Item[];

  @prop()
  public inviteLink?: string;

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
      .populate("purchases.user", "name email")
      .populate("purchases.store", "name location distance openHours")
      .populate({
        path: "purchases.items",
        populate: { path: "product" },
      })
      .populate({
        path: "inventory",
        populate: { path: "product" },
      });
  }

  public static async getAllWalletsForUser(
    this: ReturnModelType<typeof Wallet>,
    userId: string
  ) {
    return await this.find({})
      .where("assignedUsers.user")
      .equals(userId)
      .populate("assignedUsers.user", "name email")
      .populate("purchases.user", "name email")
      .populate("purchases.store", "name location distance openHours")
      .populate({
        path: "purchases.items",
        populate: { path: "product" },
      })
      .populate({
        path: "inventory",
        populate: { path: "product" },
      });
  }

  //api/wallet/[walletId]/
  public static async getWalletById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string
  ) {
    const wallet = await this.findById(walletId)
      .populate("assignedUsers.user", "name email")
      .populate("purchases.user", "name email")
      .populate("purchases.store", "name location distance openHours")
      .populate({
        path: "purchases.items",
        populate: { path: "product" },
      })
      .populate({
        path: "inventory",
        populate: { path: "product" },
      });
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
    userId: string,
    inviteLink: string
  ) {
    const wallet = await this.findOne({ inviteLink: inviteLink });
    if (!wallet) {
      throw new ErrorResponse("Invalide invite link!", 400);
    }
    if (wallet && !wallet.errors) {
      const found = wallet.assignedUsers.find(
        (user) => user.user?.toString() === userId
      );
      if (wallet.inviteLink !== inviteLink) {
        throw new ErrorResponse("Invalide invite link!", 400);
      }
      if (found) {
        const populatedWallet = await WalletModel.populate(wallet, {
          path: "assignedUsers.user",
          select: "name email",
        });
        throw new ErrorResponse("User is already assigned", 400);
      }

      if (wallet.inviteLink === inviteLink) {
        wallet.assignedUsers.push({
          user: mongoose.Types.ObjectId(userId),
          money: 0,
        });
        await wallet.save();
      }
    }
    const populatedWallet = await WalletModel.populate(wallet, {
      path: "assignedUsers.user",
      select: "name email",
    });
    return {
      message: "New user has been assigned to the wallet",
      wallet: populatedWallet,
    };
  }

  public static async getAllAssignedUser(
    this: ReturnModelType<typeof Wallet>,
    id: string
  ) {
    const wallet = await this.findById(id)
      .select("assignedUsers -_id")
      .populate("assignedUsers.user", "name email");
    return wallet?.assignedUsers;
  }

  //api/wallet/[walletId]/users/[userId]
  public static async deleteAssignedUserById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    assignedUserId: string
  ) {
    return await this.findByIdAndUpdate(
      walletId,
      {
        $pull: {
          assignedUsers: { user: assignedUserId },
        },
      },
      { new: true }
    )
      .populate("assignedUsers.user", "name email")
      .select("-purchases");
  }

  //api/wallet/[walletId]/purchases/
  public static async getAllPurchases(
    this: ReturnModelType<typeof Wallet>,
    id: string
  ) {
    const wallet = await this.findById(id)
      .select("purchases -_id")
      .populate("purchases.user", "name email")
      .populate("purchases.store", "name location distance openHours")
      .populate({
        path: "purchases.items",
        populate: { path: "product" },
      });
    return wallet?.purchases;
  }

  public static async addPurchase(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    userId: string,
    purchase: Purchase
  ) {
    let purchasePrice = 0;
    purchase.items.forEach((item: any) => {
      purchasePrice += item.price * item.quantity;
    });
    const id = new mongoose.Types.ObjectId();
    let wallet = await this.findByIdAndUpdate(
      walletId,
      {
        $push: {
          purchases: {
            _id: id,
            user: mongoose.Types.ObjectId(userId),
            store: purchase.store,
            items: purchase.items,
            price: purchasePrice,
          },
        },
      },
      { new: true }
    ).populate("purchases.user", "name email");

    wallet?.inventory.forEach((item: any, index, array) => {
      purchase.items.forEach((pItem: any) => {
        if (item.product == pItem.product) {
          array[index].quantity += pItem.quantity;
        }
      });
    });

    purchase.items.forEach((pItem: any) => {
      let found = false;
      wallet?.inventory.forEach((item: any) => {
        if (item.product == pItem.product) {
          found = true;
        }
      });
      if (!found) {
        wallet?.inventory.push(pItem);
      }
    });

    await wallet?.save();

    await Promise.all(
      purchase.items.map(async (item) => {
        if (item.changed) {
          const product = await ProductModel.findByIdAndUpdate(
            item.product,
            {
              price: item.price,
            },
            { new: true }
          );
        }
      })
    );

    if (wallet) {
      await Promise.all(
        wallet.assignedUsers.map(async (assignedUser, index, array) => {
          const size = wallet!.assignedUsers.length;
          const price =
            userId === assignedUser.user?.toString()
              ? size == 1
                ? purchasePrice
                : ((size - 1) / size) * purchasePrice
              : (1 / size) * -purchasePrice;
          const transaction = await TransactionModel.createTransaction({
            sender: new mongoose.Types.ObjectId(userId),
            recipient: assignedUser.user,
            purchase: id,
            amount: price,
          });
          if (transaction) {
            assignedUser.money += price;
          }
          array[index] = assignedUser;
        })
      );
      await wallet.save();
    }
    return wallet;
  }

  //api/wallet/[walletId]/purchases/[purchaseId]
  public static async getPurchaseById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    purchaseId: string
  ) {
    const wallet = await this.findOne(
      { $and: [{ "purchases._id": purchaseId }, { _id: walletId }] },
      { "purchases.$": true }
    )
      .populate("purchases.user", "name email")
      .populate("purchases.store", "name location distance openHours")
      .populate({
        path: "purchases.items",
        populate: { path: "product" },
      });
    return wallet?.purchases[0];
  }

  public static async deletePurchaseById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    purchaseId: string
  ) {
    const wallet = await this.findByIdAndUpdate(
      walletId,
      {
        $pull: {
          purchases: { _id: purchaseId },
        },
      },
      { new: true }
    ).populate("purchases.user", "name email");
    return wallet?.purchases;
  }

  public static async removeStoreFromPurchases(storeId: string) {
    const wallets = await WalletModel.getAllWallets();
    wallets.forEach(async (wallet: any) => {
      wallet?.purchases.forEach((purchase: any, index: any, array: any) => {
        if (purchase.store == storeId) {
          array[index].store = null;
        }
      });
      await wallet?.save();
    });
  }
}

const WalletModel = getModelForClass(Wallet);

export default WalletModel;
