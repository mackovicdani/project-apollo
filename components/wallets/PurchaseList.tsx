import { motion } from "framer-motion";
import { useState } from "react";
import { useWallet } from "../../pages/wallets";
import Modal from "../global/modal/Modal";
import AddPurchase from "./AddPurchase";
import Purchase from "./Purchase";

export default function PurchaseList() {
  const { selected } = useWallet();
  const [modal, setModal] = useState(false);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="h-[130px] w-full bg-main p-[28px]">
        <h1 className="text-center text-sm font-bold text-white md:text-lg lg:text-lg xl:text-base">
          Purchases
        </h1>
        <div
          onClick={() => setModal(true)}
          className="mt-5 flex h-[35px] items-center justify-center rounded-md bg-secondary text-xs font-bold text-white hover:cursor-pointer"
        >
          Add purchase
        </div>
        <Modal isOpen={modal} handleClose={() => setModal(false)}>
          <AddPurchase />
        </Modal>
      </div>
      <div className="flex h-full flex-col gap-2 p-3">
        {selected?.purchases &&
          selected.purchases.map((purchase: any, index: number) => {
            return (
              <Purchase
                key={purchase._id}
                purchase={purchase}
                index={index}
              ></Purchase>
            );
          })}
        {selected?.purchases.length === 0 && (
          <motion.h2
            key={"nopurchase"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={"w-full text-center font-bold text-white"}
          >
            No added purchase!
          </motion.h2>
        )}
      </div>
    </div>
  );
}
