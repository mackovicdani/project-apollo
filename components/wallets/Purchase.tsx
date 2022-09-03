import { motion } from "framer-motion";
import moment from "moment";
import "moment/locale/hu";

export default function Purchase(props: any) {
  return (
    <motion.div
      initial={{ x: 600 }}
      animate={{ x: 0 }}
      exit={{ x: -600 }}
      transition={{ delay: props.index * 0.05, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.02 }}
      className="relative flex h-[60px] w-full items-center justify-between rounded-2xl bg-elev pl-4 pr-4 font-semibold text-white shadow-md hover:cursor-pointer"
    >
      <div className="h-10 w-10 rounded-full bg-slate-300"></div>
      <div className="absolute left-16">
        <h1 className="text-sm">{props.purchase.user.name}</h1>
        <h1 className="text-xs">
          {moment(props.purchase.date).locale("hun").format("YYYY.MM.DD")}
        </h1>
      </div>
      <h1 className="rounded-full bg-primary-main p-2 pl-4 pr-4 text-xs font-bold">
        {props.purchase.price} ft
      </h1>
    </motion.div>
  );
}
