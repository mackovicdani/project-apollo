import { motion } from "framer-motion";

export default function AssignedUser(props: any) {
  const { assignedUser, isUser } = props;
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
      className={`${
        isUser ? "bg-primary-main" : "bg-elev/0"
      } relative flex h-14 w-full items-center justify-between rounded-lg pl-4 pr-4 font-semibold text-white hover:cursor-pointer`}
    >
      <div className="h-10 w-10 rounded-md bg-secondary/50 shadow"></div>
      <div className="absolute left-[4.2rem] flex flex-col">
        <h1 className="text-sm font-medium">{assignedUser.user.name}</h1>
        <h1 className="text-xs font-bold text-text-disabled">
          {assignedUser.money} ft
        </h1>
      </div>
    </motion.div>
  );
}
