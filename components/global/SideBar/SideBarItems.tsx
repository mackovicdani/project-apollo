import Link from "next/link";

export default function SideBarItems(props: any) {
  const { name, isActive, icon, isOpened } = props;
  return (
    <Link href={`/${name.toLowerCase()}`}>
      <div
        className={`relative flex aspect-square w-16 items-center justify-center rounded-md hover:cursor-pointer lg:aspect-auto lg:h-16 lg:w-full lg:justify-start lg:rounded-none lg:pl-6 ${
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
