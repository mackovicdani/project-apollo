import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    /* userRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    inventoryRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Inventory,
    },
    items: { type: Array, required: true },
    price: { type: Number, required: true }, */
  },
  { timestamps: true }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", purchaseSchema);
