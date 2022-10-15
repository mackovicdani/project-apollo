import PurchaseList from "./purchase/PurchaseList";

export default function SideComponent() {
  return (
    <div className=" h-full rounded-lg border border-border bg-back pt-12 pb-12 pl-6 pr-6">
      {/* Calendar */}
      <div className=" h-44 w-full rounded-lg border border-border bg-dark"></div>
      <PurchaseList></PurchaseList>
    </div>
  );
}
