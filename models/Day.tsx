import mongoose from "mongoose";
import Area from "./Area";

const taskSchema = new mongoose.Schema({
  type: { type: String, required: true },
  area: { type: Area, required: false },
  assigned: { type: Array, required: true },
  status: { type: String, required: true },
  comments: { type: Array, required: false },
});

const daySchema = new mongoose.Schema({
  date: { type: Date, required: true },
  tasks: { type: Array, required: false },
});

export default mongoose.models.Day || mongoose.model("Day", daySchema);
