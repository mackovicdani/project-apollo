import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/hu";

export default function Purchase(props: any) {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.02, transition: { delay: 0 } }}
      transition={{
        delay: 0.3 + props.index * 0.05,
        type: "spring",
        stiffness: 80,
      }}
      className="relative flex h-14 w-full items-center justify-between rounded-lg bg-elev/50 pl-4 pr-4 font-semibold text-white shadow hover:cursor-pointer"
    >
      <div className="h-10 w-10 rounded-md bg-secondary/50 shadow"></div>
      <div className="absolute left-16">
        <h1 className="text-sm font-medium">{props.purchase.user.name}</h1>
        <h1 className="text-xs text-text">
          {moment(props.purchase.date).locale("hun").format("YYYY.MM.DD")}
        </h1>
      </div>
      <h1 className="rounded-md bg-primary-main/70 p-2 pl-4 pr-4 text-xs font-bold shadow">
        {props.purchase.price} ft
      </h1>
    </motion.div>
  );
}
