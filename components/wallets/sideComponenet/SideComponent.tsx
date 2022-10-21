import { useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import { useWallet } from "../../../pages/wallets";
import CalendarMonth from "../../global/calendar/CalendarMonth";
import PurchaseList from "./purchase/PurchaseList";
import TransactionList from "./purchase/TransactionList";

export default function SideComponent() {
  const { selected } = useWallet();
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  return (
    <div className=" flex h-full flex-col gap-3 rounded-lg p-0 lg:border lg:border-border lg:bg-back lg:p-6 ">
      {/* Calendar */}
      <div className="h-auto w-full rounded-lg border border-border bg-dark">
        <CalendarMonth data={selected?.purchases} />
      </div>
      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-main p-3 font-bold text-text"
        type="button"
        onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
      >
        <IoSwapHorizontal className="text-lg text-primary-main"></IoSwapHorizontal>
        {!isPurchaseOpen
          ? "Switch to Purchase list"
          : "Switch to Transaction list"}
      </button>
      <div className="grow">
        {isPurchaseOpen && <PurchaseList></PurchaseList>}
        {!isPurchaseOpen && <TransactionList></TransactionList>}
      </div>
    </div>
  );
}
