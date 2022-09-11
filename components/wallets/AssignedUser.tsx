import { motion } from "framer-motion";

export default function AssignedUser(props: any) {
  const { assignedUser, isUser } = props;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: props.index * 0.05, duration: 0.5, type: "spring" }}
      whileHover={{ scale: 1.02 }}
      className={`${
        isUser ? "bg-primary-main" : "bg-elev"
      } relative flex h-[60px] w-full items-center justify-between rounded-2xl pl-4 pr-4 font-semibold text-white shadow-md hover:cursor-pointer`}
    >
      <div className="h-10 w-10 rounded-full bg-slate-300"></div>
      <div className="absolute left-16">
        <h1 className="text-sm">{assignedUser.user.name}</h1>
        <h1 className="pl-1 text-xs font-bold">{assignedUser.money} ft</h1>
      </div>
    </motion.div>
  );
}
