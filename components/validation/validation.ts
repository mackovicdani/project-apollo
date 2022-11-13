import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required"),
});

export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required").min(6, "Too Short!"),
});

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  packageSize: Yup.number().required("Required"),
  quantityType: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
});

export const purchaseSchema = Yup.object().shape({
  store: Yup.string().required("Required"),
  items: Yup.array().of(
    Yup.object().shape({
      product: Yup.object().shape({
        name: Yup.string().required("Required"),
        category: Yup.string().required("Required"),
        type: Yup.string().required("Required"),
        subtype: Yup.string().required("Required"),
        price: Yup.number().min(1).required("Required"),
        packageSize: Yup.number().min(1).required("Required"),
        quantityType: Yup.string().required("Required"),
      }),
      price: Yup.number().min(1).required("Required"),
      quantity: Yup.number().min(1).required("Required"),
      changed: Yup.boolean().required("Required"),
    })
  ),
});
