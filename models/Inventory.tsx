import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  items: { type: Array, required: true },
  assignees: { type: Array, required: true },
});

export default mongoose.models.Inventory ||
  mongoose.model("Inventory", inventorySchema);
