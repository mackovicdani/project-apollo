import { Recipe } from "../../models/types/types";
import RecipeCard from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <div className="h-full">
      <div className="flex h-16 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Recipes</h1>
          <h2 className="ml-2 text-base text-text-disabled">All</h2>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="h-12 w-12 rounded-lg border border-border bg-primary-main shadow hover:cursor-pointer"
            onClick={() => {}}
          ></div>
        </div>
      </div>
      <div className="flex h-[calc(100%-4rem)] w-full gap-2 rounded-lg border border-border bg-back p-10">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
