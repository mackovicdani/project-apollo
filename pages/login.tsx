import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { loginSchema } from "../components/validation/loginSchema";

interface Values {
  email: string;
  password: string;
}

export default function Login() {
  const [err, setErr] = useState("");
  const loginHandler = async (values: Values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/auth/login",
        values,
        config
      );

      if (data) {
        Router.push("/");
      }
    } catch (error: any) {
      setErr(error.response.data.error);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative w-5/6 max-w-md rounded-md bg-main p-8 shadow-md">
        <h1 className="text-center text-3xl font-extrabold text-primary-main">
          Login
        </h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={(values: Values) => {
            loginHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <Field
                className={`form-field ${
                  touched.email && errors.email
                    ? "border-error text-error focus:ring-error"
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
                    ? "border-error text-error focus:ring-error"
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
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div className="absolute bottom-1 left-0 right-0 ml-auto mr-auto text-center text-sm font-bold text-error">
          {err}
        </div>
      </div>
    </div>
  );
}
