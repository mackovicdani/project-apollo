import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Purchase from "./Purchase";

export default function PurchaseList(props: any) {
  const selected = useSelector((state: RootState) => state.wallet.value);
  return (
    <div className="w-9/12 bg-main p-10 font-extrabold">
      <h1 className="text-4xl">Purchases</h1>
      <div className="mt-5 flex flex-col gap-3">
        {selected?.purchases &&
          selected.purchases.map((purchase: any) => {
            return <Purchase key={selected._id} purchase={purchase}></Purchase>;
          })}
      </div>
    </div>
  );
}
