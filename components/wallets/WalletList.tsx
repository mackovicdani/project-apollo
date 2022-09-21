import { motion } from "framer-motion";
import { useWallet } from "../../pages/wallets";
import Wallet from "./Wallet";

export default function WalletList() {
  const { wallets, selected, selectWallet, setSpeed } = useWallet();
  let zIndex = 10;
  let before = true;
  let cardDesigns = [
    {
      main: "bg-green-100",
      dark: "bg-green-300",
      light: "bg-green-200",
      text: "text-back/90",
    },
    {
      main: "bg-primary-main",
      dark: "bg-primary-focus",
      light: "bg-primary-hover",
      text: "text-white/90",
    },
    {
      main: "bg-orange-600",
      dark: "bg-orange-300",
      light: "bg-orange-200",
      text: "text-white/90",
    },
    {
      main: "bg-main",
    },
  ];

  return (
    <div className="relative flex h-full w-full justify-center rounded-xl border border-border bg-back shadow-md">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
        {wallets.map((wallet: any, index: any, array: any) => {
          let visible = false;
          if (
            (index != array.length - 1 &&
              array[index + 1]._id == selected._id) ||
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
      <div className="absolute -bottom-[0.6rem] flex h-5 items-center justify-evenly rounded-full border border-border bg-main pl-2 pr-2">
        {wallets.map((wallet: any) => {
          return (
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{ width: "0.75rem" }}
              animate={{
                width: wallet._id === selected._id ? "2.5rem" : "0.75rem",
                backgroundColor:
                  wallet._id === selected._id ? "#6562fc" : "#019166",
              }}
              className={`ml-1 mr-1 h-3 rounded-full border border-border bg-card hover:cursor-pointer`}
              onClick={() => {
                let oldIndex = 0;
                let newIndex = 0;
                wallets.map((item: any, index: number) => {
                  if (item === wallet) {
                    newIndex = index;
                  } else if (item === selected) {
                    oldIndex = index;
                  }
                });

                if (oldIndex > newIndex) {
                  selectWallet(wallets[oldIndex - 1]);
                  oldIndex--;
                } else if (oldIndex < newIndex) {
                  selectWallet(wallets[oldIndex + 1]);
                  oldIndex++;
                }

                setSpeed(0.4);

                let intervalId = setInterval(() => {
                  if (oldIndex > newIndex) {
                    selectWallet(wallets[oldIndex - 1]);
                    oldIndex--;
                  } else if (oldIndex < newIndex) {
                    selectWallet(wallets[oldIndex + 1]);
                    oldIndex++;
                  } else {
                    setSpeed(0.5);
                    clearInterval(intervalId);
                  }
                }, 300);
              }}
              key={wallet._id}
            ></motion.div>
          );
        })}
      </div>
    </div>
  );
}
