import Link from "next/link";

export default function SideBarItems(props: any) {
  const { name, isActive, icon } = props;
  return (
    <Link href={`/${name.toLowerCase()}`}>
      <div
        className={`flex h-12 w-full items-center rounded-md pl-[20%] hover:cursor-pointer ${
          isActive
            ? "bg-white"
            : "bg-primary-main hover:bg-primary-hover active:bg-primary-focus"
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          {icon}
          <h2
            className={`text-lg font-medium ${
              isActive ? "text-primary-main" : "text-white"
            }`}
          >
            {name}
          </h2>
        </div>
      </div>
    </Link>
  );
}
