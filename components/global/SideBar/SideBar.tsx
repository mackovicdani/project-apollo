import { useRouter } from "next/router";
import { IoCard, IoHome, IoLogOut } from "react-icons/io5";
import { MdInventory } from "react-icons/md";

import SideBarItems from "./SideBarItems";

export default function SideBar() {
  const router = useRouter();
  const selected = router.asPath;
  return (
    <div className="fixed top-0 left-0 bottom-0 z-[100] flex w-[100px] flex-col items-center justify-between bg-primary-main p-[26px] pt-[45px] shadow-md lg:w-[270px]">
      <div className="flex h-12 w-full items-center justify-center outline outline-white">
        <h1 className="text-4xl font-semibold text-white">APOLLO</h1>
      </div>
      <div className="flex w-full flex-col gap-[5px] rounded-xl">
        <SideBarItems
          name={"Home"}
          isActive={selected === "/home"}
          icon={
            <IoHome
              className={`${
                selected === "/home" ? "text-primary-main" : "text-white"
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
      <div className="flex w-full flex-col gap-1">
        {/* usercard */}
        <div className="flex h-12 w-full items-center rounded-md bg-white p-2">
          <div className="h-10 w-10 rounded-md bg-primary-main"></div>
          <div className="pl-2">
            <h2 className="text-sm font-medium text-primary-main">name</h2>

            <h2 className="text-xs text-text-disabled">email</h2>
          </div>
        </div>
        <SideBarItems
          name={"Sign-out"}
          icon={<IoLogOut className="text-lg text-white" />}
        ></SideBarItems>
      </div>
    </div>
  );
}
