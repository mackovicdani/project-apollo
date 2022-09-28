import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/hu";
import { useState } from "react";
import Modal from "../../../global/modal/Modal";
import PurchaseDetails from "./PurchaseDetails";

export default function Purchase(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal isOpen={isOpen} size="max-w-md">
        <PurchaseDetails
          purchase={props.purchase}
          handleClose={() => setIsOpen(false)}
        />
      </Modal>
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.01, transition: { delay: 0 } }}
        transition={{
          delay: 0.3 + props.index * 0.05,
          type: "spring",
          stiffness: 80,
        }}
        onClick={() => setIsOpen(true)}
        className="relative flex h-16 min-h-[4rem] w-full items-center justify-between rounded-lg border border-border bg-main  pl-2 pr-4 font-semibold text-white shadow hover:cursor-pointer"
      >
        <div className="h-12 w-12 rounded-md border border-border bg-secondary shadow"></div>
        <div className="absolute left-16">
          <h1 className="text-sm font-medium text-text">
            {props.purchase.user.name}
          </h1>
          <h1 className=" text-xs text-text-disabled">
            {props.purchase.store.name}
          </h1>
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-base font-bold text-secondary">
            +{props.purchase.price} ft
          </h1>
          <h1 className="text-xs text-text-disabled">
            {moment(props.purchase.date).locale("hun").fromNow()}
          </h1>
        </div>
      </motion.div>
    </>
  );
}
