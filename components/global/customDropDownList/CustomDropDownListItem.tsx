import { motion } from "framer-motion";

interface CustomDropDownListItemProps {
  image?: JSX.Element;
  text: string;
  subText?: string;
  onClick: () => void;
}

export default function CustomDropDownListItem(
  props: CustomDropDownListItemProps
) {
  return (
    <motion.div
      initial={{
        height: 0,
        fontSize: "12px",
        paddingBottom: 0,
        paddingTop: 0,
      }}
      animate={{
        height: 40,
        fontSize: "14px",
        paddingBottom: 5,
        paddingTop: 5,
      }}
      exit={{
        height: 0,
        opacity: 0,
        fontSize: "12px",
        paddingBottom: 0,
        paddingTop: 0,
        transition: { duration: 0.1 },
      }}
      whileHover={{ scale: 1.005 }}
      onClick={props.onClick}
      className="flex items-center gap-2 overflow-hidden pr-2 pl-2 hover:cursor-pointer hover:bg-back/50"
    >
      {props.image && (
        <div className="aspect-square h-8 w-8 p-[2px]">
          <div className="relative flex h-full w-full">{props.image}</div>
        </div>
      )}
      <h2>{props.text}</h2>
      <h2>{props.subText}</h2>
    </motion.div>
  );
}
