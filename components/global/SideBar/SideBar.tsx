import SideBarItems from "./SideBarItems";

export default function SideBar() {
  return (
    <div className="fixed top-0 left-0 bottom-0 flex w-32 flex-col items-center justify-between bg-card shadow-md">
      <div>
        <SideBarItems name={"Home"}></SideBarItems>
      </div>
      <div>
        <SideBarItems name={"Home"}></SideBarItems>
        <SideBarItems name={"Wallets"}></SideBarItems>
      </div>
      <div>
        <SideBarItems name={"Home"}></SideBarItems>
        <SideBarItems name={"Profile"}></SideBarItems>
      </div>
    </div>
  );
}
