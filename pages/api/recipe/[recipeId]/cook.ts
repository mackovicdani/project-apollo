import auth from "../../../../lib/auth";
import CustomResponse from "../../../../lib/customResponse";
import getHandler from "../../../../lib/handler";
import dbConnect from "../../../../lib/mongoosedb";
import { Item } from "../../../../models/item.model";
import RecipeModel, { Recipe } from "../../../../models/recipe.model";

export default getHandler()
  .use(auth)
  .post(async (req, res, next) => {
    const recipeId = req.query.recipeId as string;
    const recipe = req.body.recipe as Recipe;
    const items = req.body.items as Item[];
    const assignedUsers = req.body.assignedUsers as number[];
    const walletId = req.body.walletId as string;

    await dbConnect();
    try {
      const result = await RecipeModel.cookRecipe(
        recipeId,
        recipe,
        items,
        walletId,
        assignedUsers
      );
      CustomResponse(res, 200, undefined, result);
    } catch (error) {
      next(error);
    }
  });
