import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { IoArrowDown, IoChevronForward, IoTrash } from "react-icons/io5";
import { Ingredient, Item, Recipe } from "../../models/types/types";
import { useWallet } from "../../pages/wallets";
import CustomDropDownList from "../global/customDropDownList/CustomDropDownList";
import CustomDropDownListItem from "../global/customDropDownList/CustomDropDownListItem";

interface TakeOutProps {
  recipe?: Recipe;
  assignedUsers: number[];
  handleClose: () => void;
}

interface Values {
  newItem: string;
  newItemId: Item | null;
  recipe: Recipe | null;
  items: Item[];
}
let initialValues: Values = {
  newItem: "",
  newItemId: null,
  recipe: null,
  items: [],
};

interface IngredientComponentProps {
  ingredient: Ingredient;
  index: number;
}

function IngredientComponent({ ingredient, index }: IngredientComponentProps) {
  const [isOpen, setIsOpen] = useState(false);
  let sum = ingredient.inventory?.reduce((sum, item) => {
    return item.changed ? sum + item.quantity : sum;
  }, 0);
  let percetage = (sum! / ingredient.quantity) * 100;
  return (
    <div className="flex flex-col overflow-hidden text-text">
      <div
        className="flex items-center justify-between border-b border-card p-1 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <IoChevronForward
            size={12}
            className={`${isOpen ? "rotate-90" : ""} transition-all`}
          />
          <h3 className="text-semibold text-base uppercase">
            {ingredient.type}
          </h3>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm">
          <p className={`font-semibold`}>
            {sum}/{ingredient.quantity}
          </p>
          {percetage != 100 && (
            <p
              className={`${
                percetage < 100 ? "bg-error/60" : "bg-secondary"
              } rounded-full border border-border p-1 px-2 text-xs font-bold`}
            >
              {Math.round(percetage)}%
            </p>
          )}
        </div>
      </div>

      {isOpen && ingredient.inventory!.length > 0 && (
        <div className="flex flex-col gap-1 bg-card p-2">
          {ingredient.inventory?.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="group relative flex h-10 min-h-[2.5rem] w-full items-center rounded text-text"
            >
              <div className="h-full w-10 rounded">
                <div className="relative flex h-full w-full">
                  <Image
                    src={`/products/${item.product._id}.png`}
                    objectFit="contain"
                    layout="fill"
                    alt="logo"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="ml-2">{item.product.name}</h2>
                <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                  {item.product.type}-{item.product.subtype}
                </h2>
              </div>
              <div className="absolute right-0">
                <div className="flex items-center gap-1">
                  <h2 className="text-xs text-white">{item.quantity}</h2>
                  <Field
                    className="slider h-1 w-20 appearance-none rounded border border-border bg-dark transition-all group-hover:w-48"
                    type="range"
                    min={0}
                    max={item.inStock}
                    step={10}
                    name={`recipe.ingredients[${index}].inventory[${itemIndex}].quantity`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default function TakeOut({
  recipe,
  assignedUsers,
  handleClose,
}: TakeOutProps) {
  const { selected } = useWallet();
  const [items, setItems] = useState<any>([]);

  function productIsInRecipe(value: Item): boolean {
    let find = false;
    recipe?.ingredients.map((ingredient) => {
      const res = ingredient.inventory!.find((item) => {
        return item.product._id === value.product._id;
      });
      if (res) find = true;
    });
    return !find;
  }

  function productIsInItems(items: Item[], value: Item): boolean {
    let find = false;

    const res = items.find((item) => {
      return item.product._id === value.product._id;
    });
    if (res) find = true;
    return !find;
  }

  /*  fetch all products */
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.get(
        `http://localhost:3000/api/wallet/${selected._id}/inventory/`,
        config
      );
      setItems(result.data.data);
    };

    const addItemsFromRecipe = () => {
      let tempRecipe: Recipe = { ...recipe!, ingredients: [] };
      recipe?.ingredients.map((ingredient, index) => {
        let tempIngredient: Ingredient = { ...ingredient, inventory: [] };
        let sum = ingredient.quantity;
        ingredient.inventory!.map((item) => {
          let tempQuantity = 0;
          if (sum - item.quantity > 0) {
            tempQuantity = item.quantity;
            sum -= item.quantity;
          } else {
            tempQuantity = sum;
            sum = 0;
          }
          item.changed &&
            tempIngredient.inventory?.push({
              product: item.product,
              quantity: tempQuantity,
              price: item.price,
              changed: true,
              inStock: item.quantity,
            });
        });
        tempRecipe.ingredients.push(tempIngredient);
      });
      return tempRecipe!;
    };

    initialValues.recipe = addItemsFromRecipe();
    fetchData();
  }, []);

  const submitHandler = async (recipe: Recipe, values: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `http://localhost:3000/api/recipe/${recipe._id}/cook/`,
        {
          recipe,
          items: values,
          walletId: selected._id,
          assignedUsers: assignedUsers,
        },
        config
      );

      if (data) {
        Router.replace("/recipes");
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        {recipe ? "Cooking" : "Take out"}
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let { recipe } = values;
          let temp: Item[] = [...values.items];
          recipe?.ingredients.map((ingredient) => {
            ingredient.inventory!.map((item) => {
              temp.push({
                product: item.product,
                price: item.price,
                quantity: item.quantity,
                changed: false,
              });
            });
          });
          if (temp.length > 0) {
            submitHandler(recipe!, temp);
          }
        }}
      >
        {({ values }) => (
          <Form className="mb-16 flex h-full w-full flex-col gap-2 p-3">
            <div className="scrollbar flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden rounded border border-border bg-main p-3">
              <h2 className=" font-bold text-text">{recipe?.name}:</h2>
              <div className="flex flex-col gap-2 py-1">
                {values.recipe?.ingredients.map(
                  (ingredient, ingredientIndex) => {
                    return (
                      <IngredientComponent
                        key={ingredientIndex}
                        ingredient={ingredient}
                        index={ingredientIndex}
                      />
                    );
                  }
                )}
              </div>
            </div>
            <FieldArray name="items">
              {(arrayHelpers) => (
                <div className="rounded border border-border bg-main p-3">
                  {/*  */}
                  <div className="mb-3 flex h-10 w-full items-center justify-center gap-1">
                    <div className="relative h-full flex-grow">
                      {/* dropdownlist */}
                      <CustomDropDownList
                        isSelected={values.newItemId != null}
                        isOpen={
                          values.newItem != "" && values.newItemId == null
                        }
                        id={"newItem"}
                        placeholder="Name"
                        onKeyUp={() => {
                          if (values.newItemId != null) {
                            arrayHelpers.form.setValues({
                              ...values,
                              newItemId: null,
                              quantity: 1,
                            });
                          }
                        }}
                      >
                        {items
                          .filter((item: Item) =>
                            item.product.name
                              .toLowerCase()
                              .includes(values.newItem.toLowerCase())
                          )
                          .filter(productIsInRecipe)
                          .filter((item: Item) => {
                            const res = values.items.find((value: Item) => {
                              return item.product._id == value.product._id;
                            });
                            return res ? false : true;
                          })
                          .map((item: Item, index: number) => {
                            return (
                              <CustomDropDownListItem
                                key={index}
                                text={item.product.name}
                                subText={`${item.product.price}`}
                                image={
                                  <Image
                                    src={`/products/${item.product._id}.png`}
                                    objectFit="contain"
                                    layout="fill"
                                    alt="logo"
                                  />
                                }
                                onClick={(): void => {
                                  arrayHelpers.form.setValues({
                                    ...values,
                                    newItemId: item,
                                    newItem: item.product.name,
                                  });
                                }}
                              />
                            );
                          })}
                      </CustomDropDownList>
                    </div>

                    <button
                      type="button"
                      className="z-10 flex h-full w-10 items-center justify-center rounded-md border border-border bg-secondary disabled:opacity-10"
                      onClick={() => {
                        arrayHelpers.push({
                          ...values.newItemId,
                          inStock: values.newItemId!.quantity,
                        });
                        values.newItem = "";
                        values.newItemId = null;
                      }}
                      disabled={values.newItemId == null}
                    >
                      <IoArrowDown className="text-xl text-white" />
                    </button>
                  </div>
                  {/* Item list */}
                  {values.items.length > 0 && (
                    <div className="flex flex-col overflow-hidden text-text">
                      <div className="flex flex-col gap-1 p-2">
                        {values.items.map((item, index: number) => {
                          return (
                            <motion.div
                              initial={{ scale: 0.9 }}
                              animate={{ scale: 1 }}
                              key={index}
                              className="group relative flex h-10 min-h-[2.5rem] w-full items-center rounded text-text"
                            >
                              <div className="h-full w-10 rounded">
                                <div
                                  className="relative flex h-full w-full"
                                  onClick={() => {
                                    arrayHelpers.remove(index);
                                  }}
                                >
                                  <Image
                                    src={`/products/${item.product._id}.png`}
                                    objectFit="contain"
                                    layout="fill"
                                    alt="logo"
                                  />
                                  <div className="absolute flex h-full w-full items-center justify-center rounded border border-border bg-dark text-xl text-secondary opacity-0 transition-all duration-150 hover:text-2xl group-hover:opacity-100">
                                    <IoTrash />
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <h2 className="ml-2">{item.product.name}</h2>
                                <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                                  {item.product.type}-{item.product.subtype}
                                </h2>
                              </div>
                              <div className="absolute right-3">
                                <div className="flex items-center gap-1">
                                  <h2 className="text-xs text-white">
                                    {item.quantity}
                                  </h2>
                                  <Field
                                    className="slider h-1 w-20 appearance-none rounded border border-border bg-dark transition-all group-hover:w-48"
                                    type="range"
                                    min={0}
                                    max={item.inStock}
                                    step={10}
                                    name={`items[${index}].quantity`}
                                  />
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </FieldArray>
            <div className="absolute bottom-0 left-0 flex w-full items-center justify-end gap-3 border-t border-border bg-dark p-3">
              <button
                type="button"
                onClick={() => {
                  handleClose();
                }}
                className="h-10 w-24 rounded-md border border-border bg-main text-sm text-text shadow"
              >
                Close
              </button>
              <button
                type="submit"
                className="h-10 w-24 rounded-md border border-border bg-primary-main text-sm text-white shadow disabled:opacity-25"
              >
                Create
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
