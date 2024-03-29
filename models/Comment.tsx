import mongoose from "mongoose";
import { User } from "./user.model";

const commentSchema = new mongoose.Schema(
  {
    user: { type: User, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default commentSchema;
