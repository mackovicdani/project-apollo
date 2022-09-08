import { motion } from "framer-motion";
import { useWallet } from "../../pages/wallets";
import Purchase from "./Purchase";

export default function PurchaseList() {
  const { selected } = useWallet();

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-card shadow-lg">
      <div className="h-[130px] w-full bg-main p-[28px]">
        <h1 className="text-2xl font-bold text-white">Purchases</h1>
        <div className="mt-5 flex h-[35px] items-center justify-center rounded-md bg-secondary text-xs font-bold text-white">
          Add purchase
        </div>
      </div>
      <div className="flex h-full flex-col gap-2 overflow-hidden p-[15px]">
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
