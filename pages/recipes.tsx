import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import MealTable from "../components/recipes/MealTable";
import RecipeList from "../components/recipes/RecipeList";
import { Recipe } from "../models/types/types";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: NextPage<RecipesProps> = ({ recipes }) => {
  return (
    <div className="grid h-full w-full grid-cols-xs grid-rows-xs xl:grid-cols-xl xl:grid-rows-xl 2xl:grid-cols-2xl 2xl:grid-rows-2xl">
      <div className="flex flex-col gap-4 p-6 lg:p-12">
        <MealTable></MealTable>
      </div>
      <div className="row-span-2 overflow-hidden p-6 pt-0 lg:p-12 lg:pt-0 xl:p-0">
        Side
      </div>
      <div className="p-6 pt-0 lg:p-12 lg:pt-0">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie!,
    },
  };
  let one = "http://localhost:3000/api/recipe/";

  const [firstResponse] = await Promise.all([axios.get(one, config)]);

  return {
    props: {
      recipes: firstResponse.data.data,
    },
  };
};

export default Recipes;
