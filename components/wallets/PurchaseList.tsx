import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useWallet } from "../../pages/wallets";
import Modal from "../global/modal/Modal";
import AddPurchase from "./AddPurchase";
import Purchase from "./Purchase";

const containerVariants = {
  hidden: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  visible: {
    height: "auto",
    paddingTop: 16,
    paddingBottom: 16,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      when: "beforeChildren",
    },
  },
  exit: {
    height: 0,
    paddingTop: 0,
    paddingBottom: 0,
    transition: {
      duration: 0.3,
      when: "afterChildren",
    },
  },
};

const childVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export default function PurchaseList() {
  const { selected } = useWallet();
  const [modal, setModal] = useState(null);
  const [isStoreListOpen, setStoreListOpen] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const result = await axios.get(
        "http://localhost:3000/api/store/",
        config
      );
      setStores(result.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col rounded-lg bg-card shadow-lg">
      <div className="h-[130px] bg-main p-[28px]">
        <h1 className="text-center text-sm font-bold text-white md:text-lg lg:text-lg xl:text-base">
          Purchases
        </h1>
        <div
          onClick={() => setStoreListOpen(!isStoreListOpen)}
          className="mt-5 flex h-[35px] items-center justify-center rounded-md bg-secondary text-xs font-bold text-white hover:cursor-pointer"
        >
          Add purchase
        </div>
        <Modal isOpen={modal} size="max-w-xl">
          <AddPurchase
            store={modal}
            handleClose={() => {
              setModal(null);
              setStoreListOpen(false);
            }}
          />
        </Modal>
      </div>
      <AnimatePresence>
        {isStoreListOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key="storeList"
            className="scrollbar absolute top-32 z-10 flex w-full flex-col gap-2 bg-main pl-7 pr-7"
          >
            {stores.map((store: any) => (
              <motion.div
                key={store._id}
                variants={childVariants}
                className="relative flex h-20 min-h-[5rem] w-full overflow-hidden rounded-md bg-elev p-2 shadow-md hover:cursor-pointer"
                onClick={() => setModal(store)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex h-full w-20 justify-center rounded bg-white p-2 shadow-md">
                  <div className="relative flex h-full w-full">
                    <Image
                      src={`/${store.name.toLowerCase()}.png`}
                      objectFit="contain"
                      layout="fill"
                      alt="logo"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scrollbar flex h-full flex-col gap-2 overflow-auto p-3">
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
