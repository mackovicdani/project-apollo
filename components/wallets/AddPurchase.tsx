import axios from "axios";
import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Item } from "../../models/item.model";
import Modal from "../global/modal/Modal";
import AddProduct from "./AddProduct";

interface Values {
  newItem: string;
  newItemId: string;
  type: string;
  quantity: number | "";
  price: number | "";
  items: Item[];
  sum: number;
}

export default function AddPurchase() {
  const [isDropDown, setIsDropDown] = useState(true);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);

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
    quantity: "",
    price: "",
    items: [] as Item[],
    sum: 0,
  };
  return (
    <div className="">
      <h1 className="mb-5 text-2xl text-white">Add purchase</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="h-full w-full">
            <FieldArray name="items">
              {(arrayHelpers) => (
                <>
                  <div className="mb-3 flex h-10 w-full items-center justify-center gap-1">
                    <div className="relative h-full w-[50%]">
                      <Field
                        className="form-field h-full w-full bg-elev"
                        id="newItem"
                        name="newItem"
                        type="text"
                        placeholder="product"
                        autoComplete="off"
                        onBlur={() => {
                          setTimeout(() => {
                            setIsDropDown(false);
                          }, 100);
                        }}
                        onFocus={() => setIsDropDown(true)}
                        onKeyUp={() => {
                          if (
                            data.filter(
                              (product: any) => product.name === values.newItem
                            ).length == 0
                          ) {
                            arrayHelpers.form.setValues({
                              ...values,
                              newItemId: "",
                              price: "",
                              quantity: 1,
                            });
                          }
                        }}
                      />
                      {arrayHelpers.form.values.newItem != "" &&
                        values.newItemId == "" &&
                        isDropDown && (
                          <div className="absolute left-0 top-[2.6rem] z-10 h-auto w-full rounded bg-main text-sm text-text">
                            {data
                              .filter((product: any) =>
                                product.name
                                  .toLowerCase()
                                  .includes(values.newItem)
                              )
                              .map((product: any, index: number) => (
                                <div
                                  onClick={() => {
                                    arrayHelpers.form.setValues({
                                      ...values,
                                      newItemId: product._id,
                                      newItem: product.name,
                                      price: product.price,
                                      quantity: 1,
                                    });
                                  }}
                                  key={index}
                                  className="flex h-8 items-center gap-2 p-2"
                                >
                                  <div className="aspect-square h-full bg-secondary"></div>
                                  <h2>{product.name}</h2>
                                  <h2>{product.price} ft</h2>
                                </div>
                              ))}
                          </div>
                        )}
                    </div>
                    <Field
                      className="form-field h-full w-[15%] bg-elev disabled:bg-main"
                      id="quantity"
                      name="quantity"
                      type="number"
                      placeholder="quantity"
                      autoComplete="off"
                    />
                    <Field
                      className="form-field h-full w-[20%] bg-elev disabled:bg-main"
                      id="price"
                      name="price"
                      type="number"
                      placeholder="price"
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      className={`form-button ${
                        values.newItemId == ""
                          ? "bg-primary-main"
                          : "bg-secondary"
                      } h-full w-[15%]`}
                      onClick={() => {
                        if (values.newItemId != "") {
                          arrayHelpers.push({
                            name: values.newItem,
                            quantity: values.quantity,
                            price: values.price,
                            type: "konyha",
                          });
                          if (values.price && values.quantity)
                            values.sum += values.quantity * values.price;
                          values.newItem = "";
                          values.newItemId = "";
                          values.price = "";
                          values.quantity = "";
                        } else {
                          setModal(true);
                        }
                      }}
                    >
                      Add
                    </button>
                    <Modal isOpen={modal} handleClose={() => setModal(false)}>
                      <AddProduct
                        name={values.newItem}
                        price={values.price}
                        handleClose={() => setModal(false)}
                        addProduct={(product: any) =>
                          arrayHelpers.form.setValues({
                            ...values,
                            newItemId: product._id,
                            price: product.price,
                          })
                        }
                      />
                    </Modal>
                  </div>
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
                              <h2 className="ml-2">{item.name}</h2>
                              <h2 className="ml-3 -mt-1 text-xs font-bold text-secondary">
                                {item.type.toUpperCase()}
                              </h2>
                            </div>
                            <div className="absolute right-0">
                              <h2 className="text-white">
                                {item.price + " "}
                                <span className="text-xs font-bold text-text-disabled">
                                  ft
                                </span>
                              </h2>
                              <h2 className="-mt-1 text-center text-xs font-bold text-secondary">
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
