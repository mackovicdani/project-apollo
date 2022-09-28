interface AssignedUserProps {
  assignedUser: any;
  color: any;
}

export default function AssignedUser(props: AssignedUserProps) {
  const { assignedUser, color } = props;
  return (
    <div
      className={`flex h-8 w-8 items-center justify-center rounded-full border border-border ${color.dark}`}
    >
      <h1 className={`${color.text} text-sm font-bold`}>
        {assignedUser.user.name.charAt(0)}
      </h1>
    </div>
  );
}
