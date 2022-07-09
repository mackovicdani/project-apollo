import mongoose from "mongoose";
import User from "./User";

const commentSchema = new mongoose.Schema({
  user: { type: User, required: true },
  message: { type: String, required: true },
});

export default commentSchema;
