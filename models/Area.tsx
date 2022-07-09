import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amortization: { type: Number, required: true },
  amortizationRate: { type: Number, required: true },
  health: { type: Number, required: true },
  penatlyValue: { type: Number, required: true },
  description: { type: String, required: true },
  assignees: { type: Array, required: true },
});

export default mongoose.models.Area || mongoose.model("Area", areaSchema);
