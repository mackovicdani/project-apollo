import { useState } from "react";
import { IoSwapHorizontal } from "react-icons/io5";
import PurchaseList from "./purchase/PurchaseList";
import TransactionList from "./purchase/TransactionList";

export default function SideComponent() {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  return (
    <div className=" h-full rounded-lg border border-border bg-back pt-12 pb-12 pl-6 pr-6">
      {/* Calendar */}
      <div className=" h-44 w-full rounded-lg border border-border bg-dark"></div>
      <button
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-main p-3 font-bold text-text"
        type="button"
        onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
      >
        <IoSwapHorizontal className="text-lg text-primary-main"></IoSwapHorizontal>
        {!isPurchaseOpen
          ? "Switch to Purchase list"
          : "Switch to Transaction list"}
      </button>
      {isPurchaseOpen && <PurchaseList></PurchaseList>}
      {!isPurchaseOpen && <TransactionList></TransactionList>}
    </div>
  );
}
