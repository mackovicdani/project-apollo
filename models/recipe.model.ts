import type { Ref, ReturnModelType } from "@typegoose/typegoose";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Product } from "./product.model";

class Ingredient {
  @prop()
  public type: string;

  @prop({ ref: () => Product })
  public product: Ref<Product>[];

  @prop()
  public quantity?: number;

  @prop()
  public optional?: boolean;
}

class Step {
  @prop()
  public title: string;

  @prop({ required: true })
  public desc: string;
}

export class Recipe {
  @prop({ required: true })
  public name: string;

  @prop({ type: () => [String] })
  public category: string[];

  @prop({ type: () => Ingredient })
  public ingredients: Ingredient[];

  @prop({ type: () => [Step] })
  public steps: Step[];

  @prop({})
  public description: string;

  @prop({})
  public prepareTime: number;

  @prop({})
  public portionSize: number;

  @prop({ default: new Date() })
  public lastMade: Date;

  public static async getAllRecipies(this: ReturnModelType<typeof Recipe>) {
    return await this.find({}).populate("ingredients.product");
  }

  public static async getRecipeById(
    this: ReturnModelType<typeof Recipe>,
    recipeId: string
  ) {
    return await this.findById(recipeId);
  }

  /* public static async getRecipiesContainsProductId(
    this: ReturnModelType<typeof Recipe>,
    productId: string
  ) {
    const product = await ProductModel.getProductById(productId);
    const recipies = await this.getAllRecipies();
    let foundRecipies: Recipe[] = [];
    recipies.forEach((recipe: any) => {
      let found = false;
      recipe.products.forEach((recipeProduct: any) => {
        if (
          product?.type === recipeProduct.type &&
          product?.category === recipeProduct.category
        ) {
          found = true;
        }
      });
      if (found) {
        foundRecipies.push(recipe);
      }
    });
    return foundRecipies;
  }

  public static async getRecipiesContainsProductIds(
    this: ReturnModelType<typeof Recipe>,
    productIds: string[]
  ) {
    const products = await ProductModel.getProductsByIds(productIds);
    const recipies = await this.getAllRecipies();
    let foundRecipies: Recipe[] = [];

    recipies.forEach((recipe: any) => {
      let found = true;
      var productsFound = new Array(products.length).fill(false);
      for (let i = 0; i < products.length; i++) {
        let productFound = false;
        recipe.products.forEach((recipeProduct: any) => {
          if (
            products[i].type === recipeProduct.type &&
            products[i].category === recipeProduct.category
          ) {
            productFound = true;
          }
        });
        productsFound[i] = productFound;
      }

      for (let i = 0; i < productsFound.length; i++) {
        if (productsFound[i] == false) {
          found = false;
          break;
        }
      }

      if (found) {
        foundRecipies.push(recipe);
      }
    });
    return foundRecipies;
  } */

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
        ingredients: recipe.ingredients,
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
