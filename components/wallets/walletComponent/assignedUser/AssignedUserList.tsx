import { useWallet } from "../../../../pages/wallets";
import AssignedUser from "./AssignedUser";

interface AssignedUserListProps {
  color: any;
}

export default function AssignedUserList(props: AssignedUserListProps) {
  const { selected } = useWallet();
  return (
    <div className="flex flex-row gap-2">
      {selected?.assignedUsers.map((assignedUser: any) => {
        return (
          <AssignedUser
            key={assignedUser.user._id}
            assignedUser={assignedUser}
            color={props.color}
          ></AssignedUser>
        );
      })}
    </div>
  );
}
