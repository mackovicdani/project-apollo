import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import shallow from "zustand/shallow";
import SideComponent from "../components/wallets/SideComponent";
import { initializeStore, useStore } from "../lib/store";

export const useWallet = () => {
  const { wallets, addWallet, selectWallet, selected, speed, setSpeed } =
    useStore(
      (store) => ({
        wallets: store.wallets,
        selected: store.selected,
        speed: store.speed,
        addWallet: store.addWallet,
        selectWallet: store.selectWallet,
        setSpeed: store.setSpeed,
      }),
      shallow
    );

  return { wallets, addWallet, selectWallet, selected, speed, setSpeed };
};

const Wallets: NextPage = () => {
  return (
    <div className="grid h-full grid-cols-new grid-rows-new">
      <div className=""></div>
      <div className="row-span-2">
        <SideComponent />
      </div>
      <div className=""></div>
    </div>
  );
};

{
  /* <div className="grid h-full grid-cols-3 grid-rows-xs lg:grid-rows-lg xl:grid-cols-5 xl:grid-rows-xl 2xl:grid-cols-xl2 2xl:grid-rows-xl2">
      <div className="col-span-3 flex items-center justify-center bg-back p-[10px] xl:col-span-3 2xl:col-span-4">
        <WalletList></WalletList>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] lg:col-span-1 xl:col-span-2 2xl:col-span-1 2xl:row-span-2 2xl:row-start-2">
        <AssignedUserList></AssignedUserList>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] lg:col-span-2 xl:col-span-2 xl:row-span-2 2xl:row-span-3">
        <PurchaseList></PurchaseList>
      </div>
      <div className="flex aspect-square items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main"></div>
      </div>
      <div className="flex aspect-square items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main"></div>
      </div>
      <div className="flex aspect-square items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main"></div>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] xl:col-span-3">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
    </div> */
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const zustandStore = initializeStore();

  const cookie = context.req.headers.cookie;
  const config = {
    headers: {
      cookie: cookie!,
    },
  };
  let one = "http://localhost:3000/api/wallet/";

  const [firstResponse] = await Promise.all([axios.get(one, config)]);

  zustandStore.getState().setWallets(firstResponse.data.data);
  zustandStore.getState().addWallet({
    _id: "addCard",
    name: "addCard",
    assignedUsers: [],
    purchases: [],
    inventories: [],
    design: 3,
  });
  zustandStore.getState().selectWallet(firstResponse.data.data[0]);
  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
};

export default Wallets;
