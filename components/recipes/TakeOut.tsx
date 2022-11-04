import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { IoArrowDown, IoTrash } from "react-icons/io5";
import { Item, Recipe } from "../../models/types/types";
import { useWallet } from "../../pages/wallets";
import CustomDropDownList from "../global/customDropDownList/CustomDropDownList";
import CustomDropDownListItem from "../global/customDropDownList/CustomDropDownListItem";

interface TakeOutProps {
  recipe?: Recipe;
  handleClose: () => void;
}

interface Values {
  newItem: string;
  newItemId: Item | null;
  quantity: number | "";
  items: Item[];
}
let initialValues: Values = {
  newItem: "",
  newItemId: null,
  quantity: 1,
  items: [],
};

export default function TakeOut({ recipe, handleClose }: TakeOutProps) {
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
      let temp = [] as Item[];
      recipe?.ingredients.map((ingredient) => {
        if (ingredient.product.length > 0) {
          temp.push({
            product: ingredient.product[0],
            quantity: ingredient.quantity,
            price: ingredient.product[0].price,
            changed: true,
          });
        }
      });
      initialValues.items = temp;
    };

    addItemsFromRecipe();
    fetchData();
  }, []);

  const submitHandler = async (values: any) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/wallet/${selected._id}/purchases/`,
        values,
        config
      );

      if (data) {
        Router.replace("/wallets");
        handleClose();
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
          let { items } = values;
          let temp: any[] = [];
          items.map((item: any) => {
            temp.push({
              product: item.product,
              price: item.price,
              quantity: item.quantity,
              changed: item.changed,
            });
          });
          if (items.length > 0) {
            submitHandler({ items: temp });
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
                  <div className="scrollbar flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden p-3">
                    <div className="rounded-md border border-border bg-primary-main/30 p-3">
                      <h2 className=" font-bold text-text">{recipe?.name}:</h2>
                      <div className="flex flex-col gap-2 py-1">
                        {values.items.length > 0 &&
                          values.items
                            .filter((item) => item.changed)
                            .map((item, index: number) => {
                              return (
                                <motion.div
                                  initial={{ scale: 0.9 }}
                                  animate={{ scale: 1 }}
                                  key={index}
                                  className="group relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
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
                                      {item.product.type}-{item.product.subtype}
                                    </h2>
                                  </div>
                                  <div className="absolute right-0">
                                    <div className="flex items-center gap-1">
                                      <Field
                                        className="form-field h-auto border-transparent bg-transparent p-2 text-end shadow-none focus:border-border"
                                        type="number"
                                        autoComplete="off"
                                        name={`items[${index}].quantity`}
                                      />
                                      <h2 className=" text-white">
                                        <span className="text-xs font-bold text-text-disabled">
                                          {item.product.quantityType}
                                        </span>
                                      </h2>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
                      </div>
                    </div>
                    <div className="rounded-md border border-border bg-secondary/30 p-3">
                      <h2 className=" font-bold text-text">Egyéb:</h2>
                      <div className="flex flex-col gap-2 py-1">
                        {values.items.length > 0 &&
                          values.items
                            .filter((item) => !item.changed)
                            .map((item, index: number) => {
                              return (
                                <motion.div
                                  initial={{ scale: 0.9 }}
                                  animate={{ scale: 1 }}
                                  key={index}
                                  className="group relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
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
                                      {item.product.type}-{item.product.subtype}
                                    </h2>
                                  </div>
                                  <div className="absolute right-0">
                                    <div className="flex items-center">
                                      <h2 className=" text-white">
                                        {item.quantity}
                                        <span className="text-xs font-bold text-text-disabled">
                                          {item.product.quantityType}
                                        </span>
                                      </h2>
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            })}
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
                disabled={values.items.length < 1}
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
