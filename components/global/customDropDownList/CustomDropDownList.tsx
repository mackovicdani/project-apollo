import { Field } from "formik";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CustomDropDownListProps {
  isOpen: boolean;
  children: JSX.Element;
  id: string;
  placeholder?: string;
  className?: string;
  onKeyUp?: () => void;
}

export default function CustomDropDownList(props: CustomDropDownListProps) {
  const [isOnFocus, setIsOnFocus] = useState(false);
  return (
    <div className="relative h-auto w-full">
      <Field
        className={`form-field bg-main`}
        id={props.id}
        name={props.id}
        autoComplete="off"
        placeholder={props.placeholder ? props.placeholder : props.id}
        onFocus={() => setIsOnFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setIsOnFocus(false);
          }, 200);
        }}
        onKeyUp={props.onKeyUp}
      ></Field>
      {isOnFocus && props.isOpen && (
        <div
          className={`scrollbar absolute z-20 h-auto max-h-64 w-full overflow-y-auto overflow-x-hidden rounded-b bg-dark text-text shadow-md`}
        >
          <AnimatePresence>{props.children}</AnimatePresence>
        </div>
      )}
    </div>
  );
}
