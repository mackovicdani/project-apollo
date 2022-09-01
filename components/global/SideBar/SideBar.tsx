import SideBarItems from "./SideBarItems";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 flex w-[270px] flex-col items-center justify-between bg-primary-main p-[26px] pt-[45px] shadow-md">
      <div className="flex h-[50px] w-full items-center justify-center outline outline-white">
        <h1 className="text-4xl font-semibold text-white">APOLLO</h1>
      </div>
      <div className="flex w-full flex-col gap-[5px] rounded-xl">
        <SideBarItems name={"Home"}></SideBarItems>
        <SideBarItems name={"Wallets"} selected={true}></SideBarItems>
        <SideBarItems name={"Inventory"}></SideBarItems>
      </div>
      <div className="flex w-full flex-col gap-[5px]">
        {/* usercard */}
        <div className="flex h-[50px] w-full items-center rounded-[10px] bg-white p-[7px]">
          <div className="h-[40px] w-[40px] rounded-[10px] bg-primary-main"></div>
          <div className="pl-[7px]">
            <h2 className="text-[16px] font-medium text-primary-main">
              Mackovic Daniel
            </h2>
            <h2 className="mt-[-4px] pl-1 text-[10px] text-text-disabled">
              mackovicdaniel@gmail.com
            </h2>
          </div>
        </div>
        <SideBarItems name={"Sign-out"}></SideBarItems>
      </div>
    </div>
  );
}
