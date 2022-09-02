import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Wallet from "./Wallet";

export default function WalletList(props: any) {
  const { wallets } = props;
  const selected = useSelector((state: RootState) => state.wallet.value);
  let zIndex = 10;
  let before = true;
  let cardDesigns = [
    {
      main: "bg-green-50",
      dark: "bg-green-300",
      light: "bg-green-200",
      text: "text-back",
    },
    {
      main: "bg-primary-main",
      dark: "bg-primary-focus",
      light: "bg-primary-hover",
      text: "text-white",
    },
    {
      main: "bg-orange-600",
      dark: "bg-orange-300",
      light: "bg-orange-200",
      text: "text-white",
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden rounded-xl bg-dark shadow-md">
      {wallets.map((wallet: any, index: any, array: any) => {
        let visible = false;
        if (
          (index != array.length - 1 && array[index + 1]._id == selected._id) ||
          (index != 0 && array[index - 1]._id == selected._id) ||
          wallet._id == selected._id
        ) {
          visible = true;
        }
        if (selected._id === wallet._id) {
          before = false;
        } else {
          if (before) zIndex += 1;
          else zIndex -= 1;
        }
        return (
          <Wallet
            key={wallet._id}
            wallet={wallet}
            before={before}
            zIndex={zIndex}
            visible={visible}
            color={cardDesigns[wallet.design]}
          />
        );
      })}
    </div>
  );
}
