import Link from "next/link";

export default function SideBarItems(props: any) {
  const { name, isActive, icon } = props;
  return (
    <Link href={`/${name.toLowerCase()}`}>
      <div
        className={`relative flex h-16 w-full items-center pl-6 hover:cursor-pointer ${
          isActive ? "border border-border bg-main" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          {icon}
          <h2 className={`text-base font-medium text-white`}>{name}</h2>
        </div>
        {isActive && (
          <div className="absolute right-0 h-full w-2 rounded-tl-full rounded-bl-full border border-border bg-primary-main"></div>
        )}
      </div>
    </Link>
  );
}
