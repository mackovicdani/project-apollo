import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import shallow from "zustand/shallow";
import InventoryComponent from "../components/wallets/inventoryComponent/InventoryComponent";
import SideComponent from "../components/wallets/sideComponenet/SideComponent";
import WalletList from "../components/wallets/WalletList";
import { initializeStore, useStore } from "../lib/store";

export const useWallet = () => {
  const {
    wallets,
    addWallet,
    selectWallet,
    selected,
    selectedCategory,
    speed,
    setSpeed,
    selectCategory,
  } = useStore(
    (store) => ({
      wallets: store.wallets,
      selected: store.selected,
      selectedCategory: store.selectedCategory,
      speed: store.speed,
      addWallet: store.addWallet,
      selectWallet: store.selectWallet,
      selectCategory: store.selectCategory,
      setSpeed: store.setSpeed,
    }),
    shallow
  );

  return {
    wallets,
    addWallet,
    selectWallet,
    selectCategory,
    selectedCategory,
    selected,
    speed,
    setSpeed,
  };
};

const Wallets: NextPage = () => {
  return (
    <div className="grid h-full w-full grid-cols-xs grid-rows-xs xl:grid-cols-xl xl:grid-rows-xl 2xl:grid-cols-2xl 2xl:grid-rows-2xl">
      <div className="flex flex-col gap-4 p-6 lg:p-12">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Wallets</h1>
            <h2 className="ml-2 text-base text-text-disabled">
              Monday, April 4th
            </h2>
          </div>
          <div className="flex gap-7">
            {/* <div className="w-60 rounded-lg border border-border bg-main shadow"></div> */}
            <div className="h-12 w-12 rounded-lg border border-border bg-primary-main shadow"></div>
          </div>
        </div>
        <div className="flex h-full w-full flex-col gap-6 2xl:flex-row">
          <div className="h-[300px] w-full 2xl:h-full 2xl:w-2/3">
            <WalletList></WalletList>
          </div>
          <div className="flex w-full flex-col items-center justify-between gap-2 2xl:w-1/3">
            <div className=" h-[5.5rem] w-full rounded-lg border border-border bg-back"></div>
            <div className="h-[5.5rem] w-full rounded-lg border border-border bg-back"></div>
            <div className="h-[5.5rem] w-full rounded-lg border border-border bg-secondary"></div>
          </div>
        </div>
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
