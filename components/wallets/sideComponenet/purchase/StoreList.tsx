import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "../../../global/modal/Modal";
import AddPurchase from "./AddPurchase";
interface StoreListProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (value: boolean) => void;
}

export default function StoreList({ isOpen, setIsOpen }: StoreListProps) {
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

  const [stores, setStores] = useState([]);
  const [modal, setModal] = useState(null);
  return (
    <>
      <Modal isOpen={modal || false} size="max-w-xl">
        <AddPurchase
          store={modal}
          handleClose={() => {
            setModal(null);
            setIsOpen(false);
          }}
        />
      </Modal>
      {isOpen && (
        <div className="scrollbar absolute top-0 left-0 z-10 flex h-full w-full flex-col gap-2 rounded bg-main p-3">
          <motion.div className="flex h-12 items-center justify-between">
            <h1 className="text-center text-xl font-bold text-white">
              Select Store
            </h1>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 items-center justify-center rounded-md border border-border bg-primary-main p-5 text-xs font-bold text-white hover:cursor-pointer"
            >
              Close
            </div>
          </motion.div>
          {stores.map((store: any) => (
            <motion.div
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              whileHover={{ scale: 1.02 }}
              key={store._id}
              className="relative flex h-20 min-h-[5rem] w-full rounded-md border border-border bg-card  p-2 shadow-md hover:cursor-pointer"
              onClick={() => {
                setModal(store);
              }}
            >
              <div className="flex h-full w-1/5 justify-center rounded border border-border bg-elev p-2 shadow-md">
                <div className="relative flex h-full w-full">
                  <Image
                    src={`/${store.name.toLowerCase()}.png`}
                    objectFit="contain"
                    layout="fill"
                    alt="logo"
                  />
                </div>
              </div>
              <div className="flex h-full w-4/5 justify-between p-1 px-2 text-text">
                <div className="flex flex-col items-start justify-center">
                  <h2 className="font-bold">{store.name}</h2>
                  <h3 className="ml-1 text-xs font-semibold text-primary-main">
                    {store.distance}m
                  </h3>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <h2 className="font-bold">{store.location}</h2>
                  <h3 className="text-xs font-semibold text-secondary">
                    {store.openHours}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
