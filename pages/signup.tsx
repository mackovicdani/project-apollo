import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Router from "next/router";
import { useState } from "react";
import { signupSchema } from "./components/validation/signupSchema";

interface Values {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const [err, setErr] = useState("");
  const signUpHandler = async (values: Values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/signup",
        values,
        config
      );
      if (data.user) {
        Router.push("/");
      }
    } catch (error: any) {
      if (error.response.data.message.code === 11000) {
        setErr("That Email address is already taken");
      }
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };
  return (
    <div className="flex h-screen items-center justify-center bg-gray-700">
      <div className="relative w-5/6 max-w-md rounded-md bg-gray-100 p-8 shadow-md">
        <h1 className="text-center text-3xl font-extrabold text-green-700">
          Sign up
        </h1>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={signupSchema}
          onSubmit={(values: Values, helper: FormikHelpers<Values>) => {
            signUpHandler(values);
            helper.resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <Field
                className={`form-field ${
                  touched.name && errors.name
                    ? "border-red-400 text-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                id="name"
                name="name"
              />
              <ErrorMessage
                component="a"
                className="form-errorMsg"
                name="name"
              />

              <label className="form-label" htmlFor="email">
                Email
              </label>
              <Field
                className={`form-field ${
                  touched.email && errors.email
                    ? "border-red-400 text-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                id="email"
                name="email"
                type="email"
              />
              <ErrorMessage
                component="a"
                className="form-errorMsg"
                name="email"
              />

              <label className="form-label" htmlFor="password">
                Password
              </label>
              <Field
                className={`form-field ${
                  touched.password && errors.password
                    ? "border-red-400 text-red-400 focus:border-red-500 focus:ring-red-500"
                    : "border-gray-300"
                }`}
                id="password"
                name="password"
                type="password"
              />
              <ErrorMessage
                component="a"
                className="form-errorMsg"
                name="password"
              />

              <button className="form-button" type="submit">
                Sign up
              </button>
            </Form>
          )}
        </Formik>
        <div className="absolute bottom-1 left-0 right-0 ml-auto mr-auto text-center text-sm font-bold text-red-500">
          {err}
        </div>
      </div>
    </div>
  );
}
