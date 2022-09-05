import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AssignedUser from "./AssignedUser";

export default function AssignedUserList() {
  const selected = useSelector((state: RootState) => state.wallet.value);
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <div className="h-full w-full rounded-lg bg-card">
      <div className="h-[130px] w-full bg-main p-[28px]">
        <h1 className="text-center text-sm font-bold text-white md:text-lg lg:text-lg xl:text-base">
          Assigned users
        </h1>
        <div className="mt-5 flex h-[35px] items-center justify-center rounded-md bg-secondary text-xs font-bold text-white">
          Copy invitelink
        </div>
      </div>
      <div className="overflow-hidden p-[15px]">
        <AnimatePresence mode="wait">
          {selected.assignedUsers.map((assignedUser: any) => {
            return (
              <AssignedUser
                key={assignedUser._id}
                isUser={user._id == assignedUser.user._id}
                assignedUser={assignedUser}
              ></AssignedUser>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
