import Image from "next/image";
import { useState } from "react";
import { Recipe } from "../../models/types/types";
import Modal from "../global/modal/Modal";
import RecipeDetails from "./RecipeDetails";

var convert = require("convert-units");

interface RecipeCardProps {
  recipe: Recipe;
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const [isRecipeDetailsOpen, setIsRecipeDetailsOpen] = useState(false);

  let priceCount = 0;
  recipe.ingredients.forEach((ingredient) => {
    const product = ingredient.product[0];
    const unitPrice =
      product.price /
      convert(product.packageSize)
        .from(product.quantityType)
        .to(convert().from(product!.quantityType).possibilities()[2]);
    priceCount += ingredient.quantity * unitPrice;
  });

  return (
    <>
      <Modal isOpen={isRecipeDetailsOpen} size="max-w-3xl">
        <RecipeDetails
          recipe={recipe}
          handleClose={(): void => setIsRecipeDetailsOpen(false)}
        />
      </Modal>
      <div
        onClick={() => {
          setIsRecipeDetailsOpen(true);
        }}
        className="relative flex h-full w-1/4 justify-center overflow-hidden bg-main"
      >
        <div className="absolute top-[1px] bottom-[1px] left-[1px] right-[1px] flex opacity-50">
          <Image
            src={`/tomatopasta.jpg`}
            objectFit="cover"
            layout="fill"
            alt="img"
          />
        </div>
        <div className="absolute h-full w-full bg-gradient-to-t from-dark">
          <div className="absolute top-0 p-3">
            <p className="rounded-md border border-border bg-secondary p-1 font-bold text-text">
              {priceCount} ft
            </p>
          </div>
          <div className="absolute bottom-0 flex flex-col p-3 text-text">
            <h2 className="text-xl font-bold">{recipe.name}</h2>
            <div className="flex gap-1 p-1 text-xs">
              {recipe.category.map((cat, index) => (
                <p
                  key={index}
                  className="rounded-full bg-primary-main px-2 font-semibold"
                >
                  {cat}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
