import Link from "next/link";

export default function SideBarItems(props: any) {
  const { name, isActive, icon, isOpened } = props;
  return (
    <Link href={`/${name.toLowerCase()}`}>
      <div
        className={`relative flex aspect-square w-16 items-center justify-center rounded-md hover:cursor-pointer 2xl:aspect-auto 2xl:h-16 2xl:w-full 2xl:justify-start 2xl:rounded-none 2xl:pl-6 ${
          isActive ? "border border-border bg-main" : ""
        }`}
      >
        <div className="flex items-center justify-center gap-4">
          {icon}
          {isOpened && (
            <h2 className={`text-base font-medium text-white`}>{name}</h2>
          )}
        </div>
        {isActive && isOpened && (
          <div className="absolute right-0 h-full w-2 rounded-tl-full rounded-bl-full border border-border bg-primary-main"></div>
        )}
      </div>
    </Link>
  );
}
