import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  packageSize: { type: Number, required: true },
  quantityType: { type: String, required: true },
});

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
