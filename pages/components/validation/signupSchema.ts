import * as Yup from "yup";
export const signupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email().required("Required"),
  password: Yup.string().required("Required").min(6, "Too Short!"),
});
