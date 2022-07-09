import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  items: { type: Array, required: true },
  description: { type: String, required: true },
  prepareTime: { type: Number, required: false },
  portionSize: { type: Number, required: true },
});

export default mongoose.models.Recipe || mongoose.model("Recipe", recipeSchema);
