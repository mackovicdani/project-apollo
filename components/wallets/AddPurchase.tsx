import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoArrowDown, IoArrowForward } from "react-icons/io5";
import { Item } from "../../models/item.model";
import Modal from "../global/modal/Modal";
import AddProduct from "./AddProduct";

interface Values {
  newItem: string;
  newItemId: string;
  type: string;
  priceChanged: number;
  quantity: number | "";
  price: number | "";
  items: Item[];
  sum: number;
}

export default function AddPurchase(props: any) {
  const [isDropDown, setIsDropDown] = useState(true);
  const [modal, setModal] = useState(false);
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

    fetchData();
  }, []);

  const initialValues: Values = {
    newItem: "",
    newItemId: "",
    type: "konyha",
    priceChanged: 0,
    quantity: 1,
    price: "",
    items: [] as Item[],
    sum: 0,
  };
  return (
    <div className="max-w-xl">
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        Add purchase
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="mb-20 h-full w-full p-7">
            <FieldArray name="items">
              {(arrayHelpers) => (
                <>
                  {/*  */}
                  <div className="mb-3 flex h-10 w-full items-center justify-center gap-1">
                    <div className="relative h-full flex-grow">
                      <Field
                        className={`form-field h-full w-full ${
                          values.newItemId != ""
                            ? "bg-secondary font-bold text-white"
                            : "bg-elev"
                        }`}
                        id="newItem"
                        name="newItem"
                        type="text"
                        placeholder="Product"
                        autoComplete="off"
                        onBlur={() => {
                          setTimeout(() => {
                            setIsDropDown(false);
                          }, 200);
                        }}
                        onFocus={() => setIsDropDown(true)}
                        onKeyUp={() => {
                          if (values.newItemId != "") {
                            arrayHelpers.form.setValues({
                              ...values,
                              newItemId: "",
                              price: "",
                              quantity: 1,
                            });
                          }
                        }}
                      />
                      {/* dropdownlist */}
                      {values.newItem != "" &&
                        values.newItemId == "" &&
                        isDropDown && (
                          <div className="scrollbar absolute left-0 top-[2.6rem] z-10 h-auto max-h-64 w-full overflow-y-auto overflow-x-hidden rounded-b bg-main/[97%] text-sm text-text">
                            <AnimatePresence>
                              {data
                                .filter((product: any) =>
                                  product.name
                                    .toLowerCase()
                                    .includes(values.newItem.toLowerCase())
                                )
                                .map((product: any, index: number) => (
                                  <motion.div
                                    initial={{
                                      height: 0,
                                      padding: 0,
                                    }}
                                    animate={{
                                      height: 40,
                                      padding: 10,
                                    }}
                                    exit={{
                                      height: 0,
                                      opacity: 0,
                                      padding: 0,
                                      transition: { duration: 0.1 },
                                    }}
                                    whileHover={{ scale: 1.005 }}
                                    onClick={() => {
                                      arrayHelpers.form.setValues({
                                        ...values,
                                        newItemId: product._id,
                                        newItem: product.name,
                                        price: product.price,
                                        priceChanged: product.price,
                                        quantity: 1,
                                      });
                                    }}
                                    key={index}
                                    className="flex items-center gap-2 overflow-hidden rounded hover:cursor-pointer hover:bg-card/50"
                                  >
                                    <div className="aspect-square h-6 w-6 rounded bg-secondary/50 shadow"></div>
                                    <h2>{product.name}</h2>
                                    <h2>{product.price} ft</h2>
                                  </motion.div>
                                ))}
                            </AnimatePresence>
                          </div>
                        )}
                    </div>

                    <Field
                      onKeyUp={() => {}}
                      className={`form-field h-full w-[20%] ${
                        values.priceChanged !== values.price
                          ? "bg-elev"
                          : "bg-secondary font-bold text-white"
                      } disabled:bg-main`}
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Price"
                      autoComplete="off"
                    />

                    <Field
                      className="form-field h-full w-10 bg-elev text-center disabled:bg-main"
                      id="quantity"
                      name="quantity"
                      type="number"
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      className={`form-button flex items-center justify-center ${
                        values.newItemId == ""
                          ? "bg-primary-main"
                          : "bg-secondary"
                      } h-full w-10`}
                      onClick={() => {
                        if (values.newItemId != "") {
                          arrayHelpers.push({
                            product: values.newItem,
                            quantity: values.quantity,
                            price: values.price,
                            oldPrice:
                              values.priceChanged !== values.price
                                ? values.priceChanged
                                : null,
                            changed: values.priceChanged !== values.price,
                            type: "konyha",
                          });
                          if (values.price && values.quantity)
                            values.sum += values.quantity * values.price;
                          values.newItem = "";
                          values.newItemId = "";
                          values.price = "";
                          values.quantity = 1;
                        } else {
                          setModal(true);
                        }
                      }}
                    >
                      {values.newItemId !== "" && (
                        <IoArrowDown className="text-xl text-white" />
                      )}
                      {values.newItemId == "" && (
                        <IoArrowForward className="text-xl text-white" />
                      )}
                    </button>
                    <Modal isOpen={modal} handleClose={() => setModal(false)}>
                      <AddProduct
                        name={values.newItem}
                        price={values.price}
                        handleClose={() => setModal(false)}
                        addProduct={(product: any) => {
                          arrayHelpers.form.setValues({
                            ...values,
                            newItemId: product._id,
                            newItem: product.name,
                            price: product.price,
                            priceChanged: product.price,
                          });
                          setData((current: any) => [...current, product]);
                        }}
                      />
                    </Modal>
                  </div>
                  {/* Item list */}
                  <div className="scrollbar flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-auto border-b-[1px] border-elev p-3">
                    {values.items.length > 0 &&
                      values.items.map((item: any, index: number) => {
                        return (
                          <div
                            key={index}
                            className=" relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
                          >
                            <div className="h-full w-10 rounded bg-secondary"></div>
                            <div className="flex flex-col">
                              <h2 className="ml-2">{item.product}</h2>
                              <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                                {item.type.toUpperCase()}
                              </h2>
                            </div>
                            <div className="absolute right-0">
                              <div className="flex items-center">
                                {item.oldPrice && (
                                  <Field
                                    className=" m-1 accent-secondary"
                                    type="checkbox"
                                    name={`items.${index}.changed`}
                                  />
                                )}
                                {item.oldPrice && (
                                  <h2 className=" text-xs text-text line-through">
                                    {item.oldPrice + " "}
                                  </h2>
                                )}
                                <h2 className=" text-white">
                                  {item.price + " "}
                                  <span className="text-xs font-bold text-text-disabled">
                                    ft
                                  </span>
                                </h2>
                              </div>

                              <h2 className="-mt-1 text-right text-xs font-bold text-secondary">
                                {item.quantity}db
                              </h2>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <div className="p-3 text-white">
                    <h2 className="text-end">
                      {values.sum}
                      <span className="text-xs font-bold text-text-disabled">
                        ft
                      </span>
                    </h2>
                  </div>
                </>
              )}
            </FieldArray>
            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-end gap-3 rounded-b-md bg-main p-10">
              <button
                type="button"
                onClick={() => {
                  props.handleClose();
                }}
                className="h-10 w-24 rounded-md bg-card text-sm text-text"
              >
                Close
              </button>
              <button
                type="submit"
                className="h-10 w-24 rounded-md bg-primary-main text-sm text-white"
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
