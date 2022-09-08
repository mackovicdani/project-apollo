import { motion } from "framer-motion";
import { useWallet } from "../../pages/wallets";
import Wallet from "./Wallet";

export default function WalletList() {
  const { wallets, selected, selectWallet, setSpeed, speed } = useWallet();
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
    {
      main: "bg-main",
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
      <div className="absolute bottom-10 flex h-5 justify-evenly rounded-full bg-main p-1">
        {wallets.map((wallet: any) => {
          return (
            <motion.div
              whileHover={{ scale: 1.1 }}
              initial={{ width: "0.75rem" }}
              animate={{
                width: wallet._id === selected._id ? "2.5rem" : "0.75rem",
                backgroundColor:
                  wallet._id === selected._id ? "#6562fc" : "#3A393E",
              }}
              className={`ml-1 mr-1 h-3 rounded-full bg-card hover:cursor-pointer`}
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
