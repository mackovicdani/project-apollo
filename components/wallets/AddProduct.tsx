import axios from "axios";
import { Field, Form, Formik } from "formik";
import { productSchema } from "../validation/validation";

interface Values {
  name: string;
  type: string;
  category: string;
  packageSize: number | "";
  quantityType: string;
  price: number | "";
  origin: string[];
}

export default function AddProduct(props: any) {
  const submitHandler = async (values: Values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/product/",
        { product: values },
        config
      );

      if (data) {
        addProduct(data.data);
        handleClose();
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  const { name, price, addProduct, handleClose } = props;
  return (
    <div className="">
      <h1 className="mb-5 text-2xl text-white">Add product</h1>
      <Formik
        initialValues={{
          name: name,
          type: "",
          category: "",
          packageSize: "",
          quantityType: "",
          price: price,
          origin: [],
        }}
        onSubmit={(values: Values) => {
          submitHandler(values);
        }}
        validationSchema={productSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <label className="form-label ml-1" htmlFor="name">
              Name
            </label>
            <Field
              className={"form-field bg-elev"}
              id="name"
              name="name"
              autoComplete="off"
            />

            <label className="form-label ml-1" htmlFor="type">
              Type
            </label>
            <Field
              className={"form-field bg-elev"}
              id="type"
              name="type"
              autoComplete="off"
            />

            <label className="form-label ml-1" htmlFor="category">
              Category
            </label>
            <Field
              className={"form-field bg-elev"}
              id="category"
              name="category"
            />

            <label className="form-label ml-1" htmlFor="packageSize">
              PackageSize
            </label>
            <Field
              className={"form-field bg-elev"}
              id="packageSize"
              name="packageSize"
              autoComplete="off"
            />

            <label className="form-label ml-1" htmlFor="quantityType">
              QuantityType
            </label>
            <Field
              className={"form-field bg-elev"}
              id="quantityType"
              name="quantityType"
              autoComplete="off"
            />

            <label className="form-label ml-1" htmlFor="price">
              Price
            </label>
            <Field
              className={"form-field bg-elev"}
              id="price"
              name="price"
              autoComplete="off"
            />

            <button className="form-button mt-5" type="submit">
              Add product
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
