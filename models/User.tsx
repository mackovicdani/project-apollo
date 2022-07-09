import mongoose from "mongoose";
import Purchase from "./Purchase";

const transactionSchema = new mongoose.Schema({
  purchaseRef: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Purchase,
  },
  amount: { type: Number, required: true },
});

const walletSchema = new mongoose.Schema({
  money: { type: Number, required: true },
  transactions: { type: Array, required: true },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  profilepic: { type: String, required: false },
  wallet: { type: walletSchema, required: true },
  pentaltypoints: { type: Number, required: true },
  athouse: { type: Boolean, required: true },
});

export default mongoose.models.User || mongoose.model("User", userSchema);
