import { useWallet } from "../../pages/wallets";
import AssignedUser from "./AssignedUser";

export default function AssignedUserList() {
  const { selected } = useWallet();
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-card">
      <div className="h-[130px] w-full bg-main p-[28px]">
        <h1 className="text-center text-sm font-bold text-white md:text-lg lg:text-lg xl:text-base">
          Assigned users
        </h1>
        <div className="mt-5 flex h-[35px] items-center justify-center rounded-md bg-secondary text-xs font-bold text-white">
          Copy invitelink
        </div>
      </div>
      <div className="flex flex-col gap-2 p-[15px]">
        {selected?.assignedUsers.map((assignedUser: any) => {
          return (
            <AssignedUser
              key={assignedUser._id}
              isUser={false}
              assignedUser={assignedUser}
            ></AssignedUser>
          );
        })}
      </div>
    </div>
  );
}
