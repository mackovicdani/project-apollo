import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { GiCampCookingPot } from "react-icons/gi";
import { IoAdd, IoCheckmark, IoClose, IoRemove } from "react-icons/io5";
import useWindowDimensions from "../../lib/windowDimensions";
import {
  Category,
  Ingredient,
  Item,
  Product,
  Recipe,
} from "../../models/types/types";
import { useWallet } from "../../pages/wallets";
var convert = require("convert-units");

export const getQuantityType = (product: Product) => {
  return convert().from(product!.quantityType).possibilities()[2];
};

const ingredientCheck = (
  recipe: Recipe,
  categorys: Category[],
  servingSize: number
): Ingredient[] => {
  let inventory: Item[] = [];
  let temp: Ingredient[] = [];

  categorys.map((category) => {
    category.items.map((item) => {
      inventory.push(item);
    });
  });

  recipe.ingredients.map((ingredient) => {
    let sum = 0;
    let tempIngredient: Ingredient = {
      type: ingredient.type,
      product: [],
      quantity: ingredient.quantity * servingSize,
      optional: ingredient.optional,
      inventory: [] as Item[],
    };
    ingredient.product.map((prod, index) => {
      let item = inventory.find((value) => {
        return value.product._id === prod._id;
      });
      item
        ? tempIngredient.inventory!.push({
            ...item,
            changed:
              item.quantity != 0 && sum < ingredient.quantity * servingSize,
          })
        : tempIngredient.inventory!.push({
            product: prod,
            quantity: 0,
            price: prod.price,
            changed: false,
          });
      item ? (sum += item.quantity) : undefined;
    });
    temp.push(tempIngredient);
  });

  return temp;
};
interface RecipeDetailsProps {
  recipe: Recipe;
  handleClose: () => void;
  handleTakeOut: (recipe: Recipe, assignedUsers: number[]) => void;
}

export default function RecipeDetails({
  recipe,
  handleClose,
  handleTakeOut,
}: RecipeDetailsProps) {
  const { device } = useWindowDimensions();
  const { selected } = useWallet();
  const [servingNumber, SetServingNumber] = useState(1);
  const [isSomeoneAssignedError, SetIsSomeoneAssignedError] = useState(false);
  const [ingredients, setIngredients] = useState([] as Ingredient[]);
  const [assignedUsers, setAssignedUsers] = useState<number[]>(
    Array.from(Array(selected.assignedUsers.length).keys())
  );

  useEffect(() => {
    setIngredients(ingredientCheck(recipe, selected.inventory, servingNumber));
  }, [servingNumber]);

  return (
    <div className="relative flex flex-col gap-1 p-3 text-text">
      {/* menu */}
      <div className="absolute right-3 top-3 z-10 flex w-8 flex-col gap-y-px border border-border bg-border">
        <button
          type="button"
          onClick={handleClose}
          className="flex h-8 w-full items-center justify-center bg-card p-1"
        >
          <IoClose />
        </button>
        <div
          className={`${
            device == "desktop" ? " hover:h-32" : "h-32"
          } flex h-8 flex-col gap-y-px overflow-hidden transition-all`}
        >
          <button
            type="button"
            onClick={() => {
              if (assignedUsers.length > 0) {
                handleTakeOut(
                  { ...recipe, ingredients: ingredients },
                  assignedUsers
                );
              } else {
                SetIsSomeoneAssignedError(true);
                setTimeout(() => {
                  SetIsSomeoneAssignedError(false);
                }, 300);
              }
            }}
            className=" flex min-h-[2rem] w-full items-center justify-center bg-primary-main"
          >
            <GiCampCookingPot />
          </button>
          {selected.assignedUsers.map((assignedUser: any, index: number) => (
            <button
              key={index}
              className={`${
                isSomeoneAssignedError ? "bg-error" : "bg-card"
              } relative h-8 w-full text-sm`}
              onClick={() => {
                if (assignedUsers.includes(index))
                  setAssignedUsers(
                    assignedUsers.filter((value) => value != index)
                  );
                else setAssignedUsers([...assignedUsers, index]);
              }}
            >
              {assignedUsers.includes(index) ? (
                <div className="absolute top-0 flex h-full w-full items-center justify-center bg-secondary/50">
                  <IoCheckmark className="text-lg text-white" />
                </div>
              ) : undefined}
              {assignedUser.user.name.split(" ")[0].charAt(0) +
                assignedUser.user.name.split(" ")[1].charAt(0)}
            </button>
          ))}
        </div>
      </div>
      {/* recipe image */}
      <div className="relative h-56 w-full border border-border">
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
      {/* recipe details */}
      <p className="p-3">{recipe.description}</p>
      <div className="flex flex-col gap-1 lg:flex-row">
        {/* ingredients */}
        <div className="w-full border border-border bg-dark p-3 lg:w-1/3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-secondary">Ingredients:</h3>
            <div className="flex h-full items-center justify-center">
              <div className="aspect-square h-full hover:cursor-pointer">
                <IoRemove
                  className="mx-auto my-auto h-full text-secondary"
                  onClick={() => {
                    if (servingNumber > 1) SetServingNumber(servingNumber - 1);
                  }}
                />
              </div>
              <p className="w-5 select-none text-center font-bold">
                {servingNumber}
              </p>
              <div
                className="aspect-square h-full hover:cursor-pointer"
                onClick={() => {
                  if (servingNumber < 11) SetServingNumber(servingNumber + 1);
                }}
              >
                <IoAdd className="mx-auto my-auto h-full text-secondary" />
              </div>
            </div>
          </div>
          {ingredients.map((ingredient, ingredientIndex) => (
            <div
              key={ingredientIndex}
              className="flex flex-col items-start justify-center gap-1 px-2 text-sm font-semibold"
            >
              <div className="relative flex w-full items-center gap-1">
                <div className="aspect-square h-1 rounded-full bg-white"></div>
                <p>
                  {ingredient.quantity}
                  {getQuantityType(ingredient.inventory![0].product)}
                </p>
                <p>{ingredient.type}</p>
                <p className="absolute right-0">
                  {ingredient.inventory?.reduce((sum, item) => {
                    return item.changed ? sum + item.quantity : sum;
                  }, 0)}
                  {getQuantityType(ingredient.inventory![0].product)}
                </p>
              </div>
              <div className="flex gap-1 px-2">
                {ingredient.inventory!.map((item, inventoryIndex) => (
                  <div
                    key={inventoryIndex}
                    className={`${
                      item.quantity < 1 && " opacity-60"
                    } aspect-square w-12 rounded border border-border bg-back p-1 shadow`}
                    onClick={() => {
                      const temp = [...ingredients];
                      if (
                        temp[ingredientIndex].inventory![inventoryIndex]
                          .quantity > 0
                      ) {
                        temp[ingredientIndex].inventory![
                          inventoryIndex
                        ].changed =
                          !temp[ingredientIndex].inventory![inventoryIndex]
                            .changed;
                        setIngredients(temp);
                      }
                    }}
                  >
                    <div className="relative flex h-full w-full items-end justify-end">
                      <Image
                        src={`/products/${item.product._id}.png`}
                        objectFit="contain"
                        layout="fill"
                        alt="logo"
                      />
                      {item.changed && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="z-10 border border-border bg-secondary"
                        >
                          <IoCheckmark color="white" size={12} />
                        </motion.div>
                      )}
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
