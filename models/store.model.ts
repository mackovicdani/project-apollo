import { getModelForClass, prop, ReturnModelType } from "@typegoose/typegoose";

export class Store {
  @prop({ default: "" })
  public name: string;

  @prop({ default: "" })
  public location: string;

  @prop({ default: 0 })
  public distance: number;

  @prop({ default: "" })
  public openHours: string;

  public static async createStore(
    this: ReturnModelType<typeof Store>,
    store: Store
  ) {
    return await this.create(store);
  }

  public static async updateStoreById(
    this: ReturnModelType<typeof Store>,
    storeId: string,
    store: Store
  ) {
    return await this.findByIdAndUpdate(
      storeId,
      {
        name: store.name,
        location: store.location,
        distance: store.distance,
        openHours: store.openHours,
      },
      { new: true }
    );
  }

  public static async getStoreById(
    this: ReturnModelType<typeof Store>,
    storeId: string
  ) {
    return await this.findById(storeId);
  }

  public static async getAllStores(this: ReturnModelType<typeof Store>) {
    return await this.find({});
  }

  public static async deleteStoreById(
    this: ReturnModelType<typeof Store>,
    storeId: string
  ) {
    return await this.findByIdAndDelete(storeId);
  }
}

const StoreModel = getModelForClass(Store);

export default StoreModel;
