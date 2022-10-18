import { motion } from "framer-motion";
import { useState } from "react";
import { useWallet } from "../../../../pages/wallets";
import usePagination from "../../../global/pagination/Pagination";
import Purchase from "./Purchase";
import StoreList from "./StoreList";

export default function PurchaseList() {
  const { selected } = useWallet();
  const [isStoreListOpen, setStoreListOpen] = useState(false);
  const { slicedArray: purchases, Pagination } = usePagination(
    selected.purchases.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    })
  );

  return (
    <div className="relative mt-3 flex h-[29rem] w-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-border bg-dark p-3">
      <div className="flex h-12 items-center justify-between">
        <h1 className="text-center text-xl font-bold text-text">Purchases</h1>
        <div
          onClick={() => setStoreListOpen(!isStoreListOpen)}
          className="flex h-10 items-center justify-center rounded-md border border-border bg-secondary p-5 text-xs font-bold text-white hover:cursor-pointer"
        >
          Add purchase
        </div>
      </div>

      <StoreList
        isOpen={isStoreListOpen}
        setIsOpen={setStoreListOpen}
      ></StoreList>

      <div className="scrollbar flex grow flex-col gap-2">
        {purchases.map((purchase: any, index: number) => {
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
      {Pagination}
    </div>
  );
}
