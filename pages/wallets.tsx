import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import shallow from "zustand/shallow";
import InventoryComponent from "../components/wallets/inventoryComponent/InventoryComponent";
import SideComponent from "../components/wallets/sideComponenet/SideComponent";
import WalletComponent from "../components/wallets/walletComponent/WalletComponent";
import { initializeStore, useStore } from "../lib/store";

export const useWallet = () => {
  const {
    wallets,
    selected,
    selectedCategory,
    speed,
    notifications,
    addWallet,
    selectWallet,
    setSpeed,
    selectCategory,
    addNotification,
  } = useStore(
    (store) => ({
      wallets: store.wallets,
      selected: store.selected,
      selectedCategory: store.selectedCategory,
      speed: store.speed,
      notifications: store.notifications,
      addWallet: store.addWallet,
      selectWallet: store.selectWallet,
      selectCategory: store.selectCategory,
      setSpeed: store.setSpeed,
      addNotification: store.addNotification,
    }),
    shallow
  );

  return {
    wallets,
    selectedCategory,
    selected,
    speed,
    notifications,
    addWallet,
    selectWallet,
    selectCategory,
    setSpeed,
    addNotification,
  };
};

const Wallets: NextPage = () => {
  return (
    <div className="grid h-full w-full grid-cols-xs grid-rows-xs xl:grid-cols-xl xl:grid-rows-xl 2xl:grid-cols-2xl 2xl:grid-rows-2xl">
      <div className="flex flex-col gap-4 p-6 lg:p-12">
        <WalletComponent />
      </div>
      <div className="row-span-2 overflow-hidden p-6 xl:p-0">
        <SideComponent />
      </div>
      <div className="p-6 pt-0 lg:p-12 lg:pt-0">
        <InventoryComponent />
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
