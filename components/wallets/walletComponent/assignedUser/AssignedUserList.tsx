import { IoCopy } from "react-icons/io5";
import useCopyToClipboard from "../../../../lib/copyToClipboard";
import { useWallet } from "../../../../pages/wallets";
import AssignedUser from "./AssignedUser";

interface AssignedUserListProps {
  assignedUsers: any;
  color: any;
}

export default function AssignedUserList(props: AssignedUserListProps) {
  const { selected } = useWallet();
  const [value, copy] = useCopyToClipboard();
  return (
    <div className="flex flex-row gap-2">
      {props.assignedUsers.map((assignedUser: any) => {
        return (
          <AssignedUser
            key={assignedUser.user._id}
            assignedUser={assignedUser}
            color={props.color}
          ></AssignedUser>
        );
      })}
      <div
        className={`flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white ${props.color.dark}`}
        onClick={() => copy(selected.inviteLink)}
      >
        <IoCopy className="text-xs" />
      </div>
    </div>
  );
}
