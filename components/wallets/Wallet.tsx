import { useDispatch, useSelector } from "react-redux";
import { selectWallet } from "../../slices/walletSlice";
import type { RootState } from "../../store";

export default function Wallet(props: any) {
  const selected = useSelector((state: RootState) => state.wallet.value);
  const dispatch = useDispatch();
  const { wallet } = props;
  return (
    <div
      className={`h-44 w-full rounded-lg p-4 font-bold text-gray-100 shadow-md ${
        wallet._id == selected?._id ? "bg-card" : " bg-main"
      }`}
      onClick={() => dispatch(selectWallet(wallet))}
    >
      <h2 className="text-3xl">{wallet.name}</h2>
    </div>
  );
}
