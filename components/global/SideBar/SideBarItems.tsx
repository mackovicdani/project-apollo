export default function SideBarItems(props: any) {
  const { name } = props;
  return (
    <div className="m-3 flex flex-col items-center justify-center ">
      <div className="h-10 w-10 rounded-full bg-primary"></div>
      <h2 className="pt-1 text-sm text-text">{name}</h2>
    </div>
  );
}
