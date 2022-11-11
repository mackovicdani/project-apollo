import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoArrowDown, IoTrash } from "react-icons/io5";
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
  quantity: number | "";
  recipe: Recipe | null;
  items: Item[];
}
let initialValues: Values = {
  newItem: "",
  newItemId: null,
  quantity: 1,
  recipe: null,
  items: [],
};

export default function TakeOut({
  recipe,
  assignedUsers,
  handleClose,
}: TakeOutProps) {
  const { selected } = useWallet();
  const [data, setData] = useState<any>([]);

  /*  fetch all products */
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.get(
        "http://localhost:3000/api/product/",
        config
      );
      setData(result.data.data);
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
        console.log(data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        Take out
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let { recipe } = values;
          let temp: Item[] = [];
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
          <Form className="mb-20 h-full w-full p-3">
            <FieldArray name="items">
              {(arrayHelpers) => (
                <>
                  {/*  */}
                  <div className="mb-3 flex h-10 w-full items-center justify-center gap-1">
                    <div className="relative h-full flex-grow">
                      {/* dropdownlist */}
                      <CustomDropDownList
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
                              price: "",
                              quantity: 1,
                            });
                          }
                        }}
                      >
                        {data
                          .filter((product: any) =>
                            product.name
                              .toLowerCase()
                              .includes(values.newItem.toLowerCase())
                          )
                          .map((product: any, index: number) => {
                            return (
                              <CustomDropDownListItem
                                key={index}
                                text={product.name}
                                subText={product.price}
                                image={
                                  <Image
                                    src={`/products/${product._id}.png`}
                                    objectFit="contain"
                                    layout="fill"
                                    alt="logo"
                                  />
                                }
                                onClick={(): void => {
                                  arrayHelpers.form.setValues({
                                    ...values,
                                    newItemId: product,
                                    newItem: product.name,
                                    price: product.price,
                                    priceChanged: product.price,
                                    quantity: 1,
                                  });
                                }}
                              />
                            );
                          })}
                      </CustomDropDownList>
                    </div>

                    <Field
                      className="form-field h-full w-10 bg-main text-center disabled:bg-main"
                      id="quantity"
                      name="quantity"
                      type="number"
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      className="z-10 flex h-full w-10 items-center justify-center rounded-md border border-border bg-secondary disabled:opacity-10"
                      onClick={() => {
                        arrayHelpers.push({
                          product: values.newItemId,
                          quantity: values.quantity,
                          price: values.newItemId?.price,
                          changed: false,
                        });
                      }}
                      disabled={values.newItemId == null}
                    >
                      <IoArrowDown className="text-xl text-white" />
                    </button>
                  </div>
                  {/* Item list */}
                  <div className="scrollbar flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden">
                    <div className="rounded-md border border-border p-3">
                      <h2 className=" font-bold text-text">{recipe?.name}:</h2>
                      <div className="flex flex-col gap-2 py-1">
                        {values.recipe?.ingredients.map(
                          (ingredient, ingredientIndex) => {
                            let sum = ingredient.inventory?.reduce(
                              (sum, item) => {
                                return item.changed ? sum + item.quantity : sum;
                              },
                              0
                            );
                            let percetage = (sum! / ingredient.quantity) * 100;
                            return (
                              <div
                                key={ingredientIndex}
                                className="flex flex-col overflow-hidden rounded border border-border bg-main text-text"
                              >
                                <div className="flex h-10 items-center justify-between border-b border-border bg-primary-main p-1 px-3">
                                  <h3 className="text-semibold text-sm">
                                    {ingredient.type}:
                                  </h3>
                                  <div className="flex items-center gap-3 text-sm">
                                    <p className={`font-semibold`}>
                                      {sum}/{ingredient.quantity}
                                    </p>
                                    {percetage != 100 && (
                                      <p
                                        className={`${
                                          percetage < 100
                                            ? "bg-error"
                                            : "bg-secondary"
                                        } border border-border p-1 font-bold`}
                                      >
                                        {Math.round(percetage)}%
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col gap-1 p-2">
                                  {ingredient.inventory?.map(
                                    (item, itemIndex) => (
                                      <motion.div
                                        initial={{ scale: 0.9 }}
                                        animate={{ scale: 1 }}
                                        key={itemIndex}
                                        className="relative flex h-10 min-h-[2.5rem] w-full items-center rounded text-text"
                                      >
                                        <div className="h-full w-10 rounded">
                                          <div
                                            className="relative flex h-full w-full"
                                            onClick={() => {
                                              arrayHelpers.remove(
                                                ingredientIndex
                                              );
                                            }}
                                          >
                                            <Image
                                              src={`/products/${item.product._id}.png`}
                                              objectFit="contain"
                                              layout="fill"
                                              alt="logo"
                                            />
                                          </div>
                                        </div>
                                        <div className="flex flex-col">
                                          <h2 className="ml-2">
                                            {item.product.name}
                                          </h2>
                                          <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                                            {item.product.type}-
                                            {item.product.subtype}
                                          </h2>
                                        </div>
                                        <div className="group absolute right-0">
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
                                              name={`recipe.ingredients[${ingredientIndex}].inventory[${itemIndex}].quantity`}
                                            />
                                          </div>
                                        </div>
                                      </motion.div>
                                    )
                                  )}
                                </div>
                              </div>
                            );
                          }
                        )}
                        {values.items.length > 0 && (
                          <div className="flex flex-col overflow-hidden rounded border border-border bg-main text-text">
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
                                      <h2 className="ml-2">
                                        {item.product.name}
                                      </h2>
                                      <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                                        {item.product.type}-
                                        {item.product.subtype}
                                      </h2>
                                    </div>
                                    <div className="absolute right-0">
                                      <div className="flex items-center gap-1">
                                        <h2 className="text-xs text-white">
                                          {item.quantity}
                                        </h2>
                                      </div>
                                    </div>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </FieldArray>
            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-end gap-3 rounded-b-xl p-10">
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
