import type { NextPage } from "next";

const Recipes: NextPage = () => {
  return (
    <div className="grid h-full w-full grid-cols-xs grid-rows-xs xl:grid-cols-xl xl:grid-rows-xl 2xl:grid-cols-2xl 2xl:grid-rows-2xl">
      <div className="flex flex-col gap-4 p-6 lg:p-12">Table</div>
      <div className="row-span-2 overflow-hidden p-6 pt-0 lg:p-12 lg:pt-0 xl:p-0">
        Side
      </div>
      <div className="p-6 pt-0 lg:p-12">Recipes</div>
    </div>
  );
};

export default Recipes;
