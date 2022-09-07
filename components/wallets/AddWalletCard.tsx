import axios from "axios";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useWallet } from "../../pages/wallets";

interface Values {
  inviteLink: string;
}

export default function AddWalletCard() {
  const { addWallet, selectWallet } = useWallet();
  const [err, setErr] = useState(null);
  const [result, setResult] = useState(null);
  const submitHandler = async (values: Values) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.put(
        "http://localhost:3000/api/wallet/",
        values,
        config
      );

      if (data) {
        setResult(data.data.message);
        setTimeout(() => {
          setResult(null);
        }, 3000);
        addWallet(data.data.wallet);
        selectWallet(data.data.wallet);
      }
    } catch (error: any) {
      console.log(error);
      setErr(error.response.data.error);
      setTimeout(() => {
        setErr(null);
      }, 3000);
    }
  };
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center text-center">
      <Formik
        initialValues={{
          inviteLink: "",
        }}
        onSubmit={(values: any, helper: FormikHelpers<Values>) => {
          submitHandler(values);
          helper.resetForm();
        }}
      >
        {() => (
          <Form className="w-full">
            <label
              className="form-label m-0 p-0 text-3xl text-secondary"
              htmlFor="inviteLink"
            >
              Invite link
            </label>
            <Field
              className={"form-field mt-2"}
              id="inviteLink"
              name="inviteLink"
              autoComplete="off"
            />
            <ErrorMessage
              component="a"
              className="form-errorMsg"
              name="inviteLink"
            />
            <button className="form-button mt-2 w-32" type="submit">
              Join
            </button>
          </Form>
        )}
      </Formik>
      <h2 className="absolute bottom-1 text-sm text-succes">{result}</h2>
      <h2 className="absolute bottom-1 text-sm text-error">{err}</h2>
    </div>
  );
}
