import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Inventory } from "./inventory.model";
import { Product } from "./product.model";

export class Recipe {
  @prop({ required: true, default: "" })
  public name: string;

  @prop({})
  public category: string;

  @prop({ ref: () => Inventory })
  public inventory: Ref<Inventory>;

  @prop({ type: () => Product })
  public products: Product[];

  @prop({})
  public description: string;

  @prop({})
  public prepareTime: number;

  @prop({})
  public portionSize: number;

  @prop({ default: new Date() })
  public lastMade: Date;

  public static async getAllRecipies(this: ReturnModelType<typeof Recipe>) {
    return await this.find({});
  }

  public static async getRecipeById(
    this: ReturnModelType<typeof Recipe>,
    recipeId: string
  ) {
    return await this.findById(recipeId);
  }

  public static async createRecipe(
    this: ReturnModelType<typeof Recipe>,
    recipe: Recipe
  ) {
    return await this.create(recipe);
  }

  public static async updateRecipeById(
    this: ReturnModelType<typeof Recipe>,
    recipeId: string,
    recipe: Recipe
  ) {
    return await this.findByIdAndUpdate(
      recipeId,
      {
        name: recipe.name,
        category: recipe.category,
        inventory: recipe.inventory,
        products: recipe.products,
        description: recipe.description,
        prepareTime: recipe.prepareTime,
        portionSize: recipe.portionSize,
        lastMade: recipe.lastMade,
      },
      { new: true }
    );
  }

  public static async deleteRecipeById(
    this: ReturnModelType<typeof Recipe>,
    recipeId: string
  ) {
    return await this.findByIdAndDelete(recipeId);
  }
}

const RecipeModel = getModelForClass(Recipe);

export default RecipeModel;
