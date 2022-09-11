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
