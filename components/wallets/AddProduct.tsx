import axios from "axios";
import { Field, Form, Formik } from "formik";

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
    <div className="h-auto">
      <h1 className="pt-5 text-center text-2xl font-bold text-secondary">
        Add product
      </h1>
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
      >
        {({ errors, touched }) => (
          <Form className="mb-20 flex flex-col gap-3 p-7">
            <Field
              className={
                "block h-10 border-b-[1px] border-elev bg-card pl-2 text-center text-2xl text-secondary focus:border-primary-main focus:outline-none"
              }
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="off"
              spellCheck="false"
            />
            <Field
              className={"form-field bg-elev"}
              id="type"
              name="type"
              placeholder="Type"
              autoComplete="off"
            />

            <Field
              as="select"
              className={"form-field bg-elev"}
              id="category"
              placeholder="Category"
              name="category"
              autoComplete="off"
            >
              <option value="red">Konyha</option>
              <option value="green">Takarítás</option>
              <option value="blue">Orvosság</option>
            </Field>

            <div className="flex gap-2">
              <Field
                className={"form-field w-5/6 bg-elev"}
                id="packageSize"
                name="packageSize"
                placeholder="PackageSize"
                autoComplete="off"
              />

              <Field
                as="select"
                className={"form-field w-1/6 bg-elev"}
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
              className={"form-field bg-elev"}
              id="price"
              name="price"
              placeholder="Price"
              autoComplete="off"
            />

            <div className="absolute bottom-0 left-0 flex h-20 w-full items-center justify-end gap-3 rounded-b-md bg-main p-10">
              <button
                onClick={() => props.handleClose()}
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
