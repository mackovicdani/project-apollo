import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import { Inventory } from "./inventory.model";
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

  @prop({ default: null, type: () => Inventory })
  public inventories: Inventory[];

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
      .populate("purchases.user", "name email");
  }

  public static async getAllWalletsForUser(
    this: ReturnModelType<typeof Wallet>,
    userId: string
  ) {
    return await this.find({})
      .where("assignedUsers.user")
      .equals(userId)
      .populate("assignedUsers.user", "name email")
      .populate("purchases.user", "name email");
  }

  //api/wallet/[walletId]/
  public static async getWalletById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string
  ) {
    const wallet = await this.findById(walletId)
      .populate("assignedUsers.user", "name email")
      .populate("purchases.user", "name email");
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
    userId: string,
    inviteLink: string
  ) {
    const wallet = await this.findById(walletId);
    if (wallet && !wallet.errors) {
      const found = wallet.assignedUsers.find(
        (user) => user.user?.toString() === userId
      );
      if (wallet.inviteLink !== inviteLink) {
        return { message: "Invalide invite link" };
      }
      if (found) {
        const populatedWallet = await WalletModel.populate(wallet, {
          path: "assignedUsers.user",
          select: "name email",
        });
        return { message: "User is already assigned", wallet: populatedWallet };
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
      .populate("purchases.user", "name email");
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
      purchasePrice += item.price;
    });
    const id = new mongoose.Types.ObjectId();
    let wallet = await this.findByIdAndUpdate(
      walletId,
      {
        $push: {
          purchases: {
            _id: id,
            user: mongoose.Types.ObjectId(userId),
            inventory: purchase.inventory,
            store: purchase.store,
            items: purchase.items,
            price: purchasePrice,
          },
        },
      },
      { new: true }
    ).populate("purchases.user", "name email");

    const inventoryId = purchase.inventory as unknown as string;
    const inventory = await this.getInventoryById(walletId, inventoryId);
    inventory?.items.forEach((item: any, index, array) => {
      purchase.items.forEach((pItem: any) => {
        if (item.product == pItem.product) {
          array[index].quantity += pItem.quantity;
        }
      });
    });

    purchase.items.forEach((pItem: any) => {
      let found = false;
      inventory?.items.forEach((item: any) => {
        if (item.product == pItem.product) {
          found = true;
        }
      });
      if (!found) {
        inventory?.items.push(pItem);
      }
    });

    wallet = await WalletModel.editInventoryById(
      walletId,
      inventoryId,
      inventory as Inventory
    );

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
                ? purchase.price
                : ((size - 1) / size) * purchase.price
              : (1 / size) * -purchase.price;
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
    ).populate("purchases.user", "name email");
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

  public static async getAllInventories(
    this: ReturnModelType<typeof Wallet>,
    id: string
  ) {
    const wallet = await this.findById(id).select("inventories -_id");
    return wallet?.inventories;
  }

  public static async getInventoryById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    inventoryId: string
  ) {
    const wallet = await this.findOne(
      { $and: [{ "inventories._id": inventoryId }, { _id: walletId }] },
      { "inventories.$": true }
    );
    return wallet?.inventories[0];
  }

  public static async addInventory(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    inventory: Inventory
  ) {
    const id = new mongoose.Types.ObjectId();
    let wallet = await this.findByIdAndUpdate(
      walletId,
      {
        $push: {
          inventories: {
            _id: id,
            name: inventory.name,
            items: inventory.items,
          },
        },
      },
      { new: true }
    );
    return wallet;
  }

  public static async editInventoryById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    inventoryId: string,
    newInventory: Inventory
  ) {
    const wallet = await this.findById(walletId);
    wallet?.inventories.forEach((inventory: any, index, array) => {
      if (inventory._id == inventoryId) {
        array[index].name = newInventory.name;
        array[index].items = newInventory.items;
      }
    });
    await wallet?.save();
    return wallet;
  }

  public static async deleteInventoryById(
    this: ReturnModelType<typeof Wallet>,
    walletId: string,
    inventoryId: string
  ) {
    const wallet = await this.findByIdAndUpdate(
      walletId,
      {
        $pull: {
          inventories: { _id: inventoryId },
        },
      },
      { new: true }
    );
    return wallet?.inventories;
  }
}

const WalletModel = getModelForClass(Wallet);

export default WalletModel;
