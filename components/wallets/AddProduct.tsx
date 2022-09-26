import axios from "axios";
import { Field, Form, Formik } from "formik";

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
        values,
        config
      );

      if (data) {
        /* Upload image */
        values.image != "" && (await uploadImage(data.data._id, values.image));

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
          category: "vegetables",
          type: "",
          subtype: "",
          packageSize: "",
          quantityType: "db",
          price: price,
          origin: [],
        }}
        onSubmit={(values: Values) => {
          console.log(values);
          submitHandler(values);
        }}
      >
        {({ setFieldValue }) => (
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
            <Field
              className={"form-field bg-main"}
              id="type"
              name="type"
              placeholder="Type"
              autoComplete="off"
            />

            <Field
              className={"form-field bg-main"}
              id="subtype"
              name="subtype"
              placeholder="Subtype"
              autoComplete="off"
            />

            <Field
              as="select"
              className={"form-field bg-main"}
              id="category"
              name="category"
              autoComplete="off"
            >
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
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
                <option value="db">db</option>
                <option value="gr">gr</option>
                <option value="kg">kg</option>
                <option value="kg">kg</option>
                <option value="l">l</option>
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
