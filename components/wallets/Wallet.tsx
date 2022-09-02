import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { selectWallet } from "../../slices/walletSlice";
import type { RootState } from "../../store";

export default function Wallet(props: any) {
  const selected = useSelector((state: RootState) => state.wallet.value);
  const dispatch = useDispatch();
  const { wallet, before, zIndex, visible, color } = props;
  const isSelected = selected._id == wallet._id;

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{
        scale: isSelected ? 2 : 1,
        x: isSelected
          ? 0
          : before
          ? visible
            ? "-140%"
            : "-80%"
          : visible
          ? "140%"
          : "80%",
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`${color.main} ${color.text} absolute h-[120px] w-[180px] rounded-md p-3 shadow-md hover:cursor-pointer lg:h-[130px] lg:w-[200px] xl:h-[150px] xl:w-[230px]`}
      style={{ zIndex: zIndex }}
      onClick={() => dispatch(selectWallet(wallet))}
    >
      <h2 className={`h-5 font-bold`}>{wallet.name}</h2>
      <h2 className={`pl-1 text-[30%] font-bold opacity-50`}>{wallet._id}</h2>
      <h2 className="absolute bottom-1 right-3 text-[130%] font-bold">
        {Math.round(wallet.assignedUsers[0].money)} ft
      </h2>
      <div
        className={`absolute top-5 right-5 aspect-square w-2/6 rounded-full ${color.dark} shadow-md`}
      ></div>
      <div
        className={`absolute top-3 right-3 aspect-square w-1/6 rounded-full ${color.light} shadow-md`}
      ></div>
    </motion.div>
  );
}
