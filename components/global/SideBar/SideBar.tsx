import { useRouter } from "next/router";
import { IoCard, IoHome, IoLogOut } from "react-icons/io5";
import { MdInventory } from "react-icons/md";
import useWindowDimensions from "../../../lib/windowDimensions";

import SideBarItems from "./SideBarItems";

export default function SideBar(props: any) {
  const { width } = useWindowDimensions();
  const isOpened = width >= 1024;
  const router = useRouter();
  const selected = router.asPath;
  return (
    <div className="fixed left-0 right-0 bottom-0 z-[100] flex h-20 items-center justify-between border border-border bg-back p-2 shadow-md lg:top-0 lg:h-full lg:w-80 lg:flex-col lg:p-0 lg:pb-12 lg:pt-12">
      <div className="flex flex-1 justify-start lg:w-full lg:justify-center lg:p-0">
        <div className="flex h-12 w-12 items-center justify-center border-[2px] lg:w-[calc(100%-3rem)]">
          <h1 className="text-3xl font-semibold text-white">
            {isOpened ? "APOLLO" : "A"}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center lg:w-full lg:flex-col">
        <SideBarItems
          name={"Home"}
          isActive={selected === "/"}
          isOpened={isOpened}
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
          isOpened={isOpened}
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
          isOpened={isOpened}
          icon={
            <MdInventory
              className={`${
                selected === "/inventory" ? "text-primary-main" : "text-white"
              } text-lg`}
            />
          }
        ></SideBarItems>
      </div>
      <div className="flex flex-1 items-center justify-end lg:w-full lg:flex-col lg:gap-4">
        {/* usercard */}
        <div className="flex flex-col items-center justify-center rounded-md border-border lg:w-[calc(100%-3rem)] lg:border lg:bg-main lg:p-2 lg:shadow">
          <div className="min-w h-14 w-14 rounded-md border border-border bg-secondary lg:-mt-7 lg:h-14 lg:w-14 lg:rounded-full"></div>
          {isOpened && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-sm font-medium text-primary-main">
                Mackovic Daniel
              </h2>
              <h2 className="text-xs text-text-disabled">
                mackovicdaniel@gmail.com
              </h2>
            </div>
          )}
        </div>
        <div className="flex h-14 w-14 items-center justify-center gap-1 rounded-md border border-border bg-primary-main text-white lg:w-[calc(100%-3rem)]">
          <IoLogOut className="text-lg text-white"></IoLogOut>
          {isOpened && "Sign-out"}
        </div>
      </div>
    </div>
  );
}
