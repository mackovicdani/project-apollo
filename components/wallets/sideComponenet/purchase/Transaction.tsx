import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/hu";

interface TransactionProps {
  transaction: any;
  index: number;
}

export default function Transaction(props: TransactionProps) {
  return (
    <>
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.3 + props.index * 0.05,
          type: "spring",
          stiffness: 80,
        }}
        className={`${
          props.transaction.amount < 0 ? "to-error/10" : "to-secondary/10"
        } relative flex h-16 min-h-[4rem] w-full items-center rounded-lg border border-border bg-gradient-to-l from-dark pl-2 pr-4 font-semibold text-white shadow`}
      >
        <div className="h-12 w-12 shrink-0 rounded-md border border-border bg-card shadow"></div>
        <div className="grow px-2">
          <h1 className="max-h-8 max-w-[12rem] flex-nowrap overflow-hidden text-ellipsis text-xs font-medium text-text">
            {props.transaction.desc}
          </h1>
          <h1 className="text-xs text-text-disabled">
            {props.transaction.sender.name}
          </h1>
        </div>
        <div className="flex shrink-0 flex-col items-end">
          <h1
            className={`${
              props.transaction.amount < 0 ? "text-error" : "text-secondary"
            } text-base font-bold`}
          >
            {props.transaction.amount > 0 ? "+" : ""}
            {Math.round(props.transaction.amount)} ft
          </h1>
          <h1 className="text-xs text-text-disabled">
            {moment(props.transaction.date).locale("hun").fromNow()}
          </h1>
        </div>
      </motion.div>
    </>
  );
}
