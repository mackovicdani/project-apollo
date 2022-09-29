import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
interface NotificationProps {
  type: "succes" | "error" | "info" | "warrning";
  title: string;
  desc: string;
  index: number;
  notification: any;
}

export default function Notification(props: NotificationProps) {
  return (
    <motion.div
      initial={{ x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      className="flex w-full items-start overflow-hidden rounded-lg border border-border bg-card p-2 pl-4"
    >
      <IoCheckmarkCircleOutline className="w-1/12 text-4xl text-succes" />
      <div className="flex w-11/12 flex-col justify-center pl-2">
        <h1 className="font-medium text-succes">{props.title}</h1>
        <h2 className="text-xs text-text">{props.desc}</h2>
      </div>
    </motion.div>
  );
}
