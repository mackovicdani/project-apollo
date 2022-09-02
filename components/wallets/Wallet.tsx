import { useDispatch, useSelector } from "react-redux";
import { selectWallet } from "../../slices/walletSlice";
import type { RootState } from "../../store";

export default function Wallet(props: any) {
  const selected = useSelector((state: RootState) => state.wallet.value);
  const dispatch = useDispatch();
  const { wallet, before, zIndex, visible, color } = props;
  return (
    <div
      className={`absolute rounded-lg p-4 font-bold hover:cursor-pointer ${
        color.text
      }  transition-custom duration-[1000ms] ease-in-out ${
        wallet._id == selected?._id
          ? `h-[290px] w-[465px] ${color.main} shadow-lg`
          : `${color.main} h-[150px] w-[230px] bg-opacity-70 ${
              before
                ? `translate-x-[-300px] ${
                    visible
                      ? "opacity-100"
                      : "h-[120px] w-[184px] translate-x-[-200px] opacity-0"
                  }`
                : `translate-x-[300px] ${
                    visible
                      ? "opacity-100"
                      : "h-[120px] w-[184px] translate-x-[200px] opacity-0"
                  }`
            }`
      }`}
      style={{ zIndex: zIndex }}
      onClick={() => dispatch(selectWallet(wallet))}
    >
      <h2
        className={`transition-all duration-[1000ms] ease-in-out ${
          wallet._id == selected?._id ? "h-12 text-[250%]" : "h-6 text-[125%]"
        }`}
      >
        {wallet.name}
      </h2>
      <h2
        className={`opacity-50 transition-all duration-[1000ms] ease-in-out ${
          color.text
        } ${
          wallet._id == selected?._id ? `pl-2 text-[80%]` : `pl-1 text-[40%]`
        }`}
      >
        {wallet._id}
      </h2>
      <h2
        className={`absolute transition-all duration-[1000ms] ease-in-out ${
          wallet._id == selected?._id
            ? "bottom-4 right-4 h-12 text-[250%]"
            : "bottom-2 right-2 h-6 text-[125%]"
        }`}
      >
        {Math.round(wallet.assignedUsers[0].money)} ft
      </h2>
      <div
        className={`absolute top-[15%] right-[15%] aspect-square w-2/6 rounded-full ${color.dark} shadow-md`}
      ></div>
      <div
        className={`absolute top-[10%] right-[10%] aspect-square w-1/6 rounded-full ${color.light} shadow-md`}
      ></div>
    </div>
  );
}
