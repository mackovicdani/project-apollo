import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import CardPicker from "../components/recipes/CardPicker";
import RecipeList from "../components/recipes/RecipeList";
import { initializeStore } from "../lib/store";
import { Recipe } from "../models/types/types";

interface RecipesProps {
  recipes: Recipe[];
}

const Recipes: NextPage<RecipesProps> = ({ recipes }) => {
  return (
    <div className="grid h-full min-h-screen w-full grid-cols-xs grid-rows-xs xl:grid-cols-xl xl:grid-rows-xl 2xl:grid-cols-2xl 2xl:grid-rows-2xl">
      <div></div>
      {/* <div className="flex flex-col gap-4 p-6 lg:p-12">
        <MealTable></MealTable>
      </div> */}
      <div className="row-span-2 p-6 pb-3 pt-0 lg:p-12 xl:p-0">
        <div className="h-full w-full border border-border bg-back p-3">
          <CardPicker />
        </div>
      </div>
      <div className="p-6 py-6 lg:p-12 lg:pt-0">
        <RecipeList recipes={recipes} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const cookie = context.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie!,
    },
  };
  let recipeEndPoint = "http://localhost:3000/api/recipe/";
  let walletEndPoint = "http://localhost:3000/api/wallet/";

  const [firstResponse, secondResponse] = await Promise.all([
    axios.get(recipeEndPoint, config),
    axios.get(walletEndPoint, config),
  ]);

  zustandStore.getState().setWallets(secondResponse.data.data);
  zustandStore.getState().selectWallet(secondResponse.data.data[0]);

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
      recipes: firstResponse.data.data,
    },
  };
};

export default Recipes;
