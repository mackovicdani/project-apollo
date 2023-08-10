import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useWallet } from "../../../../pages/wallets";
import CustomDropDownList from "../../../global/customDropDownList/CustomDropDownList";
import CustomDropDownListItem from "../../../global/customDropDownList/CustomDropDownListItem";

interface Values {
  name: string;
  image: File | "";
  category: string;
  type: string;
  subtype: string;
  packageSize: number | "";
  quantityType: string;
  price: number | "";
  origin: string[];
}

export default function AddProduct(props: any) {
  const { addNotification } = useWallet();
  const [uniqueTypes, setUniqueTypes] = useState<any[]>([]);
  const [uniqueSubTypes, setUniqueSubTypes] = useState(new Map());

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

      let tempTypeSet = new Set();
      let tempSubTypeMap = new Map();
      result.data.data.map((product: any) => {
        tempTypeSet.add(product.type);

        if (tempSubTypeMap.has(product.type)) {
          tempSubTypeMap.set(
            product.type,
            new Set(tempSubTypeMap.get(product.type)).add(product.subtype)
          );
        } else {
          tempSubTypeMap.set(product.type, new Set([product.subtype]));
        }
      });
      setUniqueTypes(Array.from(tempTypeSet));
      tempSubTypeMap.forEach((value, key) => {
        tempSubTypeMap.set(key, Array.from(value));
      });
      setUniqueSubTypes(tempSubTypeMap);
    };

    fetchData();
  }, []);

  const uploadImage = async (name: string, image: File) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let formData = new FormData();
    formData.append("name", name);
    formData.append("media", image);
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/upload/",
        formData,
        config
      );
      console.log(data);
    } catch (error: any) {
      console.log(error);
    }
  };
  const submitHandler = async (values: Values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/product/",
        {
          name: values.name,
          category: values.category,
          type: values.type,
          subtype: values.subtype,
          packageSize: values.packageSize,
          quantityType: values.quantityType,
          price: values.price,
          origin: values.origin,
        },
        config
      );

      if (data) {
        /* Upload image */
        values.image != "" && (await uploadImage(data.data._id, values.image));

        addNotification({
          type: "succes",
          title: "New product added succesffully",
          desc: "",
        });

        addProduct(data.data);
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const { name, price, addProduct, handleClose } = props;
  return (
    <div className="h-auto">
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        Add product
      </h1>
      <Formik
        initialValues={{
          name: name,
          image: "",
          category: "Vegetables",
          type: "",
          subtype: "",
          packageSize: "",
          quantityType: "kg",
          price: price,
          origin: [],
        }}
        onSubmit={(values: Values) => {
          submitHandler(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className="mb-20 flex flex-col gap-3 p-7">
            <Field
              className={
                "block h-10 border-b-[1px] border-border bg-back pl-2 text-2xl text-secondary focus:border-primary-main focus:outline-none"
              }
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              spellCheck="false"
            />
            <input
              className={"text-secondary"}
              id="image"
              name="image"
              type="file"
              onChange={(event) =>
                setFieldValue("image", event.target.files![0])
              }
            />
            <CustomDropDownList
              isOpen={values.type != ""}
              id="type"
              isSelected={false}
            >
              <>
                {uniqueTypes
                  .filter((product: any) =>
                    product.toLowerCase().includes(values.type.toLowerCase())
                  )
                  .map((product: any) => {
                    return (
                      <CustomDropDownListItem
                        key={product}
                        text={product}
                        onClick={function (): void {
                          setFieldValue("type", product);
                        }}
                      ></CustomDropDownListItem>
                    );
                  })}
              </>
            </CustomDropDownList>

            <CustomDropDownList isOpen={true} id="subtype" isSelected={false}>
              <>
                {uniqueSubTypes.get(values.type) &&
                  uniqueSubTypes.get(values.type).map((product: any) => {
                    return (
                      <CustomDropDownListItem
                        key={product}
                        text={product}
                        onClick={function (): void {
                          setFieldValue("subtype", product);
                        }}
                      ></CustomDropDownListItem>
                    );
                  })}
              </>
            </CustomDropDownList>

            <Field
              as="select"
              className={"form-field bg-main"}
              id="category"
              name="category"
              autoComplete="off"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Canned goods">Canned goods</option>
              <option value="Froozen foods">Froozen foods</option>
              <option value="Meat">Meat</option>
              <option value="Fish">Fish</option>
              <option value="Deli">Deli</option>
              <option value="Condiments&Spices">Condiments&Spices</option>
              <option value="Snacks">Snacks</option>
              <option value="Bread&Bakery">Bread&Bakery</option>
              <option value="Beverages">Beverages</option>
              <option value="Pasta&Rice">Pasta&Rice</option>
              <option value="Sereal">Sereal</option>
              <option value="Personal Items">Personal Items</option>
              <option value="Health Care">Health Care</option>
              <option value="Paper">Paper</option>
              <option value="Household">Household</option>
            </Field>

            <div className="flex gap-2">
              <Field
                className={"form-field w-5/6 bg-main"}
                id="packageSize"
                name="packageSize"
                placeholder="PackageSize"
                autoComplete="off"
              />

              <Field
                as="select"
                className={"form-field w-1/6 bg-main"}
                id="quantityType"
                name="quantityType"
                placeholder="QuantityType"
                autoComplete="off"
              >
                <option value="gr">kg</option>
                <option value="kg">g</option>
                <option value="kg">l</option>
                <option value="l">ml</option>
                <option value="l">db</option>
              </Field>
            </div>
            <Field
              className={"form-field bg-main"}
              id="price"
              name="price"
              placeholder="Price"
              autoComplete="off"
            />

            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-end gap-3  p-10">
              <button
                type="button"
                onClick={() => props.handleClose()}
                className="h-10 w-24 rounded-md border border-border bg-main text-sm text-text"
              >
                Close
              </button>
              <button
                type="submit"
                className="h-10 w-24 rounded-md border border-border bg-primary-main text-sm text-white"
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
