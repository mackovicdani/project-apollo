import axios from "axios";
import { useRouter } from "next/router";
import { IoCard, IoHome, IoLogOut } from "react-icons/io5";
import { MdInventory } from "react-icons/md";
import useWindowDimensions from "../../../lib/windowDimensions";

import SideBarItems from "./SideBarItems";

export default function SideBar(props: any) {
  const { width } = useWindowDimensions();
  const isOpened = width >= 1536;
  const router = useRouter();
  const selected = router.asPath;

  const handleSignOut = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await axios.get(
      "http://localhost:3000/api/auth/logout/",
      config
    );
    if (result) {
      router.reload();
    }
  };

  return (
    <div className="fixed left-0 right-0 bottom-0 z-[100] flex h-20 items-center justify-between border border-border bg-back p-2 shadow-md 2xl:top-0 2xl:h-full 2xl:w-80 2xl:flex-col 2xl:p-0 2xl:pb-12 2xl:pt-12">
      <div className="flex flex-1 justify-start 2xl:w-full 2xl:justify-center 2xl:p-0">
        <div className="flex h-12 w-12 items-center justify-center border-[2px] 2xl:w-[calc(100%-3rem)]">
          <h1 className="text-3xl font-semibold text-white">
            {isOpened ? "APOLLO" : "A"}
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center 2xl:w-full 2xl:flex-col">
        <SideBarItems
          name={"Home"}
          isActive={selected === "/"}
          isOpened={isOpened}
          icon={
            <IoHome
              className={`${
                selected === "/" ? "text-primary-main" : "text-white"
              } text-2xl`}
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
              } text-2xl`}
            />
          }
        ></SideBarItems>
        <SideBarItems
          name={"Recipes"}
          isActive={selected === "/recipes"}
          isOpened={isOpened}
          icon={
            <MdInventory
              className={`${
                selected === "/recipes" ? "text-primary-main" : "text-white"
              } text-2xl`}
            />
          }
        ></SideBarItems>
      </div>
      <div className="flex flex-1 items-center justify-end 2xl:w-full 2xl:flex-col 2xl:gap-4">
        {/* usercard */}
        <div className="flex flex-col items-center justify-center rounded-md border-border 2xl:w-[calc(100%-3rem)] 2xl:border 2xl:bg-main 2xl:p-2 2xl:shadow">
          <div className="min-w h-14 w-14 rounded-md border border-border bg-secondary 2xl:-mt-7 2xl:h-14 2xl:w-14 2xl:rounded-full"></div>
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
        <div
          className="flex h-14 w-14 items-center justify-center gap-1 rounded-md border border-border bg-primary-main text-white hover:cursor-pointer 2xl:w-[calc(100%-3rem)]"
          onClick={() => handleSignOut()}
        >
          <IoLogOut className="text-2xl text-white"></IoLogOut>
          {isOpened && "Sign-out"}
        </div>
      </div>
    </div>
  );
}
