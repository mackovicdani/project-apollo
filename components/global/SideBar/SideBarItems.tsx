export default function SideBarItems(props: any) {
  const { name, selected } = props;
  return (
    <div
      className={`flex h-[50px] w-full items-center justify-center rounded-[10px] hover:cursor-pointer ${
        selected
          ? "bg-white"
          : "bg-primary-main hover:bg-primary-hover active:bg-primary-focus"
      }`}
    >
      <h2
        className={`pt-1 text-lg font-bold ${
          selected ? "text-primary-main" : "text-white"
        }`}
      >
        {name}
      </h2>
    </div>
  );
}
