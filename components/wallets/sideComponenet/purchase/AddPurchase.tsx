import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { motion } from "framer-motion";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { IoArrowDown, IoArrowForward } from "react-icons/io5";
import { Item } from "../../../../models/item.model";
import { useWallet } from "../../../../pages/wallets";
import CustomDropDownList from "../../../global/customDropDownList/CustomDropDownList";
import CustomDropDownListItem from "../../../global/customDropDownList/CustomDropDownListItem";
import Modal from "../../../global/modal/Modal";
import AddProduct from "./AddProduct";

interface Values {
  newItem: string;
  newItemId: string;
  type: string;
  store: string;
  priceChanged: number;
  quantity: number | "";
  price: number | "";
  items: Item[];
  sum: number;
}

export default function AddPurchase(props: any) {
  const { selected } = useWallet();
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

  const submitHandler = async (values: any) => {
    console.log(values);
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
        props.handleClose();
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const initialValues: Values = {
    newItem: "",
    newItemId: "",
    type: "konyha",
    store: props.store._id,
    priceChanged: 0,
    quantity: 1,
    price: "",
    items: [] as Item[],
    sum: 0,
  };
  return (
    <div className="">
      <div className="absolute top-5 left-7 z-0 flex h-10 w-16 justify-center rounded border border-border bg-white p-2">
        <div className="relative flex h-full w-full">
          <Image
            src={`/${props.store.name.toLowerCase()}.png`}
            objectFit="contain"
            layout="fill"
            alt="logo"
          />
        </div>
      </div>
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        Add purchase
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          let { store, items } = values;
          let temp: any[] = [];
          items.map((item: any) => {
            temp.push({
              product: item.product,
              price: item.price,
              quantity: item.quantity,
              changed: item.changed,
            });
          });
          submitHandler({ store, items: temp });
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
                      {/* dropdownlist */}
                      <CustomDropDownList
                        isOpen={
                          values.newItem != "" &&
                          values.newItemId == "" &&
                          isDropDown
                        }
                        id={"newItem"}
                        placeholder="Name"
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
                                    newItemId: product._id,
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
                      onKeyUp={() => {}}
                      className={`form-field h-full w-[20%] ${
                        values.priceChanged !== values.price
                          ? "bg-main"
                          : "bg-secondary font-bold text-white"
                      } disabled:bg-main`}
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Price"
                      autoComplete="off"
                    />

                    <Field
                      className="form-field h-full w-10 bg-main text-center disabled:bg-main"
                      id="quantity"
                      name="quantity"
                      type="number"
                      autoComplete="off"
                    />

                    <button
                      type="button"
                      className={`form-button z-10 flex items-center justify-center border border-border ${
                        values.newItemId == ""
                          ? "bg-primary-main"
                          : "bg-secondary"
                      } h-full w-10`}
                      onClick={() => {
                        if (values.newItemId != "") {
                          arrayHelpers.push({
                            product: values.newItemId,
                            productName: values.newItem,
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
                    <Modal isOpen={modal} size="max-w-md">
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
                  <div className="scrollbar flex h-full max-h-96 flex-col flex-nowrap gap-2 overflow-y-auto overflow-x-hidden border-b-[1px] border-elev p-3">
                    {values.items.length > 0 &&
                      values.items.map((item: any, index: number) => {
                        return (
                          <motion.div
                            initial={{ x: 100 }}
                            animate={{ x: 0 }}
                            key={index}
                            className=" relative flex h-10 min-h-[2.5rem] w-full rounded text-text"
                          >
                            <div className="h-full w-10 rounded">
                              <div className="relative flex h-full w-full">
                                <Image
                                  src={`/products/${item.product}.png`}
                                  objectFit="contain"
                                  layout="fill"
                                  alt="logo"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <h2 className="ml-2">{item.productName}</h2>
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
                          </motion.div>
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
            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-end gap-3 rounded-b-xl p-10">
              <button
                type="button"
                onClick={() => {
                  props.handleClose();
                }}
                className="h-10 w-24 rounded-md border border-border bg-main text-sm text-text shadow"
              >
                Close
              </button>
              <button
                type="submit"
                className="h-10 w-24 rounded-md border border-border bg-primary-main text-sm text-white shadow"
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
