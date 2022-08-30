import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Purchase from "./Purchase";

export default function PurchaseList(props: any) {
  const selected = useSelector((state: RootState) => state.wallet.value);
  return (
    <div className="m-5 ml-0 w-9/12 rounded-lg bg-main p-10 font-extrabold shadow-lg">
      <h1 className="text-4xl">Purchases</h1>
      <div className="mt-5 flex flex-col gap-2">
        {selected?.purchases &&
          selected.purchases.map((purchase: any) => {
            return <Purchase key={purchase._id} purchase={purchase}></Purchase>;
          })}
        {selected?.purchases.length === 0 && <h2>No added purchase!</h2>}
      </div>
    </div>
  );
}
