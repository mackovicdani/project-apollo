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
            ? "-60%"
            : "-30%"
          : visible
          ? "60%"
          : "30%",
        opacity: visible ? (isSelected ? 1 : 0.6) : 0,
      }}
      transition={{ duration: speed, ease: "easeInOut" }}
      className={`${color.main} ${color.text} absolute aspect-[16/11] w-[80%] max-w-[320px] rounded-2xl border border-border p-5 shadow-md hover:cursor-pointer`}
      style={{ zIndex: zIndex }}
      onClick={() => selectWallet(wallet)}
    >
      {wallet.name !== "addCard" && (
        <>
          <h2 className={`text-4xl font-extrabold`}>{wallet.name}</h2>
          <h2 className={`-mt-2 pl-2 text-xs font-bold opacity-50`}>
            {wallet._id.substring(0, 20)}
          </h2>
          <h2 className="absolute bottom-3 right-5 text-2xl font-extrabold">
            {Math.round(wallet.assignedUsers[0].money)} ft
          </h2>
          <div
            className={`absolute right-10 top-8 aspect-square w-[30%] rounded-full ${color.dark}`}
          ></div>
          <div
            className={`absolute top-6 right-6 aspect-square w-[20%] rounded-full ${color.light}`}
          ></div>
        </>
      )}
      {wallet.name === "addCard" && <AddWalletCard></AddWalletCard>}
    </motion.div>
  );
}
