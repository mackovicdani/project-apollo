import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import shallow from "zustand/shallow";
import AssignedUserList from "../components/wallets/AssignedUserList";
import PurchaseList from "../components/wallets/PurchaseList";
import WalletList from "../components/wallets/WalletList";
import { initializeStore, useStore } from "../lib/store";

export const useWallet = () => {
  const { wallets, addWallet, selectWallet, selected } = useStore(
    (store) => ({
      wallets: store.wallets,
      selected: store.selected,
      addWallet: store.addWallet,
      selectWallet: store.selectWallet,
    }),
    shallow
  );

  return { wallets, addWallet, selectWallet, selected };
};

const Wallets: NextPage = () => {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-xs lg:grid-rows-lg xl:grid-cols-5 xl:grid-rows-xl 2xl:grid-cols-6 2xl:grid-rows-xl2">
      <div className="col-span-3 flex items-center justify-center bg-back p-[10px] xl:col-span-4 2xl:col-span-4">
        <WalletList></WalletList>
      </div>
      <div className="2cx col-span-3 flex items-center justify-center p-[10px] lg:col-span-1 xl:col-span-1 2xl:row-span-2 2xl:row-start-2">
        <AssignedUserList></AssignedUserList>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] lg:col-span-2 xl:col-span-2 xl:row-span-2 2xl:row-span-3">
        <PurchaseList></PurchaseList>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
      <div className="col-span-3 flex items-center justify-center p-[10px] xl:col-span-3">
        <div className="h-full w-full rounded-lg bg-main "></div>
      </div>
    </div>
  );
};

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
