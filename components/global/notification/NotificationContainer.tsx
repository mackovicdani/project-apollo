import { AnimatePresence } from "framer-motion";
import { useWallet } from "../../../pages/wallets";
import Notification from "./Notification";

export default function NotificationContainer() {
  const { notifications } = useWallet();
  return (
    <>
      <div className="fixed top-0 right-0 z-[1001] flex w-96 flex-col gap-1 p-4">
        <AnimatePresence>
          {notifications &&
            notifications.map((notification, index: number) => {
              return (
                <Notification
                  type={notification.type}
                  title={notification.title}
                  desc={notification.desc}
                  index={index}
                  key={notification.index}
                  notification={notification}
                />
              );
            })}
        </AnimatePresence>
      </div>
    </>
  );
}
