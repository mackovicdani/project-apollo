import { useRouter } from "next/router";
import { IoCard, IoHome, IoLogOut } from "react-icons/io5";
import { MdInventory } from "react-icons/md";

import SideBarItems from "./SideBarItems";

export default function SideBar() {
  const router = useRouter();
  const selected = router.asPath;
  return (
    <div className="fixed top-0 left-0 bottom-0 z-[100] flex w-20 flex-col items-center justify-between border border-border bg-back pb-12 pt-12 shadow-md lg:w-80">
      <div className="flex h-12 w-[calc(100%-3rem)] items-center justify-center border-[2px]">
        <h1 className="text-3xl font-semibold text-white">APOLLO</h1>
      </div>
      <div className="flex w-full flex-col">
        <SideBarItems
          name={"Home"}
          isActive={selected === "/"}
          icon={
            <IoHome
              className={`${
                selected === "/" ? "text-primary-main" : "text-white"
              } text-lg`}
            />
          }
        ></SideBarItems>
        <SideBarItems
          name={"Wallets"}
          isActive={selected === "/wallets"}
          icon={
            <IoCard
              className={`${
                selected === "/wallets" ? "text-primary-main" : "text-white"
              } text-lg`}
            />
          }
        ></SideBarItems>
        <SideBarItems
          name={"Inventory"}
          isActive={selected === "/inventory"}
          icon={
            <MdInventory
              className={`${
                selected === "/inventory" ? "text-primary-main" : "text-white"
              } text-lg`}
            />
          }
        ></SideBarItems>
      </div>
      <div className="flex w-full flex-col gap-4">
        {/* usercard */}
        <div className="ml-6 flex h-20 w-[calc(100%-3rem)] flex-col items-center justify-center rounded-md border border-border bg-main p-2 shadow">
          <div className="-mt-10 h-16 w-16 rounded-full border border-border bg-primary-main"></div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm font-medium text-primary-main">
              Mackovic Daniel
            </h2>
            <h2 className="text-xs text-text-disabled">
              mackovicdaniel@gmail.com
            </h2>
          </div>
        </div>
        <div className="ml-6 flex h-14 w-[calc(100%-3rem)] items-center justify-center gap-1 rounded-md border border-border bg-primary-main text-white">
          <IoLogOut className="text-lg text-white"></IoLogOut>Sign-out
        </div>
      </div>
    </div>
  );
}
