import mongoose from "mongoose";
import Product from "./Product";

const itemSchema = new mongoose.Schema({
  productRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Product,
  },
  quantity: { type: Number, required: true },
});

export default itemSchema;
