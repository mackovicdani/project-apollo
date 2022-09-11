import { Field, FieldArray, Form, Formik } from "formik";
import { Item } from "../../models/item.model";

interface Values {
  newItem: string;
  type: string;
  quantity: number | "";
  price: number | "";
  items: Item[];
  sum: number;
}

export default function AddPurchase() {
  const initialValues: Values = {
    newItem: "",
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
                    <Field
                      className="form-field h-full w-[50%] bg-elev"
                      id="newItem"
                      name="newItem"
                      type="text"
                      placeholder="product"
                      autoComplete="off"
                    />
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
                      className="form-button h-full w-[15%]"
                      onClick={() => {
                        arrayHelpers.push({
                          name: values.newItem,
                          quantity: values.quantity,
                          price: values.price,
                          type: "konyha",
                        });
                        if (values.price && values.quantity)
                          values.sum += values.quantity * values.price;
                        values.newItem = "";
                        values.price = "";
                        values.quantity = "";
                      }}
                    >
                      Add
                    </button>
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
                                {item.price}
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
