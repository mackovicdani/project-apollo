import { AnimatePresence } from "framer-motion";

interface CustomDropDownListProps {
  isOpen: boolean;
  children: JSX.Element;
}

export default function CustomDropDownList(props: CustomDropDownListProps) {
  return (
    <>
      {props.isOpen && (
        <div className="scrollbar absolute left-0 top-[2.6rem] z-20 h-auto max-h-64 w-full overflow-y-auto overflow-x-hidden rounded-b bg-dark text-text shadow-md">
          <AnimatePresence>{props.children}</AnimatePresence>
        </div>
      )}
    </>
  );
}
