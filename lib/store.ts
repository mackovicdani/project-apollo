import { useLayoutEffect } from "react";
import create, { UseBoundStore } from "zustand";
import createContext from "zustand/context";
import { combine } from "zustand/middleware";
import { Wallet } from "../models/wallet.model";

let store: any;

type InitialState = ReturnType<typeof getDefaultInitialState>;
// eslint-disable-next-line
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseBoundStore<infer T>
  ? T
  : never;

interface Store {
  wallets: any[];
  selected: any;
  speed: any;
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: any) => void;
  selectWallet: (wallet: any) => void;
  setSpeed: (speed: number) => void;
}

const getDefaultInitialState = () => ({
  wallets: [] as Wallet[],
  selected: null,
  speed: 0.5,
});

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<Store>(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set) => ({
      setWallets: (wallets: Wallet[]) => {
        set({
          wallets,
        });
      },
      addWallet: (wallet: any) => {
        set((state) => ({
          ...state,
          wallets: addWallet(state.wallets, wallet),
        }));
      },
      selectWallet: (wallet: any) => {
        set((state) => ({
          ...state,
          selected: wallet,
        }));
      },
      setSpeed: (speed: number) => {
        set({
          speed: speed,
        });
      },
    }))
  );
};

export const useCreateStore = (serverInitialState: InitialState) => {
  if (typeof window === "undefined") {
    return () => initializeStore(serverInitialState);
  }

  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(serverInitialState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          ...store.getState(),
          ...serverInitialState,
        },
        true
      );
    }
  });

  return () => store;
};
const addWallet = (wallets: Wallet[], wallet: Wallet): Wallet[] => {
  if (wallet.name === "addCard") wallets.splice(wallets.length, 0, wallet);
  else wallets.splice(wallets.length - 1, 0, wallet);
  return wallets;
};

const selectW = (wallets: Wallet[], selected: any, wallet: any): any => {
  let oldIndex = 0;
  let newIndex = 0;
  if (selected === null) return wallet;
  wallets.map((item: any, index: number) => {
    if (item._id === selected._id) {
      oldIndex = index;
    } else if (item._id === wallet._id) {
      newIndex = index;
    }
  });
  if (oldIndex > newIndex) return wallets[oldIndex - 1];
  else if (oldIndex < newIndex) return wallets[oldIndex + 1];
  else return wallet;
};
