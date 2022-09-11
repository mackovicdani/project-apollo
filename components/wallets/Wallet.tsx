import { motion } from "framer-motion";
import { useWallet } from "../../pages/wallets";
import AddWalletCard from "./AddWalletCard";

export default function Wallet(props: any) {
  const { selectWallet, selected, speed } = useWallet();
  const { wallet, before, zIndex, visible, color } = props;
  const isSelected = selected._id == wallet._id;

  return (
    <motion.div
      initial={{ x: 0, scale: 0 }}
      animate={{
        scale: isSelected ? 1 : 0.5,
        x: isSelected
          ? 0
          : before
          ? visible
            ? "-70%"
            : "-40%"
          : visible
          ? "70%"
          : "40%",
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: speed, ease: "easeInOut" }}
      className={`${color.main} ${color.text} absolute h-[240px] w-[360px] rounded-2xl p-5 shadow-md hover:cursor-pointer lg:h-[260px] lg:w-[400px] xl:h-[300px] xl:w-[460px]`}
      style={{ zIndex: zIndex }}
      onClick={() => selectWallet(wallet)}
    >
      {wallet.name !== "addCard" && (
        <>
          <h2 className={`text-4xl font-bold`}>{wallet.name}</h2>
          <h2 className={`pl-2 text-xs font-bold opacity-50`}>{wallet._id}</h2>
          <h2 className="absolute bottom-3 right-5 text-4xl font-extrabold">
            {Math.round(wallet.assignedUsers[0].money)} ft
          </h2>
          <div
            className={`absolute top-10 right-10 aspect-square w-2/6 rounded-full ${color.dark} shadow-md`}
          ></div>
          <div
            className={`absolute top-6 right-6 aspect-square w-1/6 rounded-full ${color.light} shadow-md`}
          ></div>
        </>
      )}
      {wallet.name === "addCard" && <AddWalletCard></AddWalletCard>}
    </motion.div>
  );
}
