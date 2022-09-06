import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";
import dbConnect from "../../../lib/mongoosedb";
import RecipeModel, { Recipe } from "../../../models/recipe.model";

export default getHandler()
  .use(auth)
  .get(async (req, res, next) => {
    const recipeId = req.query.recipeId as string;
    await dbConnect();
    try {
      const recipe = await RecipeModel.getRecipeById(recipeId);
      CustomResponse(res, 200, undefined, recipe);
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    const recipeId = req.query.recipeId as string;
    const recipe = req.body.recipe as Recipe;
    await dbConnect();
    try {
      const updatedRecipe = await RecipeModel.updateRecipeById(
        recipeId,
        recipe
      );
      CustomResponse(res, 200, "Recipe modified successfully!", updatedRecipe);
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    const recipeId = req.query.recipeId as string;
    await dbConnect();
    try {
      const recipe = await RecipeModel.deleteRecipeById(recipeId);
      CustomResponse(res, 200, "Recipe successfully deleted", recipe);
    } catch (error) {
      next(error);
    }
  });
