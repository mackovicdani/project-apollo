import Image from "next/image";
import { GiCampCookingPot } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Recipe } from "../../models/types/types";

interface RecipeDetailsProps {
  recipe: Recipe;
  handleClose: () => void;
}

export default function RecipeDetails({
  recipe,
  handleClose,
}: RecipeDetailsProps) {
  return (
    <div className="relative flex flex-col gap-1 p-3 text-text">
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-y-px border border-border bg-border">
        <button type="button" onClick={handleClose} className="bg-card p-1">
          <IoClose />
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="bg-primary-main p-1"
        >
          <GiCampCookingPot />
        </button>
      </div>
      <div className="relative h-44 w-full border border-border">
        <Image
          src={`/tomatopasta.jpg`}
          objectFit="cover"
          layout="fill"
          alt="img"
        />
        <div className="absolute flex h-full w-full flex-col justify-end bg-gradient-to-tr from-dark p-3">
          <h2 className="text-4xl font-bold text-white">{recipe.name}</h2>
          <div className="flex gap-2 px-1">
            {recipe.category.map((cat, index) => (
              <p
                key={index}
                className="rounded-full border border-border bg-primary-main p-1 px-3 text-xs font-semibold text-white"
              >
                {cat}
              </p>
            ))}
          </div>
        </div>
      </div>

      <p>{recipe.description}</p>
      <div className="flex flex-col gap-1 lg:flex-row">
        <div className="w-full p-3 lg:w-1/3">
          <h3 className="text-xl font-bold text-secondary">Ingredients:</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div
              key={index}
              className="flex items-center justify-start gap-1 px-2 text-sm font-semibold"
            >
              <div className="aspect-square h-1 rounded-full bg-white"></div>
              <p>{ingredient.quantity}</p>
              <p>{ingredient.type}</p>
              <div className="flex">
                {ingredient.product.map((prod) => (
                  <div key={prod._id} className="aspect-square w-10">
                    <div className="relative flex h-full w-full">
                      <Image
                        src={`/products/${prod._id}.png`}
                        objectFit="contain"
                        layout="fill"
                        alt="logo"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full p-3 lg:w-2/3">
          <h3 className="text-xl font-bold text-secondary">Steps:</h3>
          {recipe.steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start justify-start gap-1 px-2 text-sm font-semibold"
            >
              <p className="text-primary-main">{index + 1}.</p>
              <div className="flex flex-col">
                <p>{step.title}</p>
                <p className="pl-1 text-xs font-normal text-text-disabled">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
