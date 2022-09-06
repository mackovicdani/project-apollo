import auth from "../../../lib/auth";
import CustomResponse from "../../../lib/customResponse";
import getHandler from "../../../lib/handler";

import dbConnect from "../../../lib/mongoosedb";
import RecipeModel, { Recipe } from "../../../models/recipe.model";

export default getHandler()
  .use(auth)
  .post(async (req, res, next) => {
    const recipe = req.body.recipe as Recipe;
    await dbConnect();
    try {
      const newRecipe = await RecipeModel.createRecipe(recipe);
      CustomResponse(res, 201, "New recipe added!", newRecipe);
    } catch (error) {
      next(error);
    }
  })
  .get(async (req, res, next) => {
    await dbConnect();
    try {
      const recipies = await RecipeModel.getAllRecipies();
      CustomResponse(res, 200, undefined, recipies);
    } catch (error) {
      next(error);
    }
  });
