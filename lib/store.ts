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
  selectedCategory: any;
  speed: any;
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: any) => void;
  selectWallet: (wallet: any) => void;
  selectCategory: (category: any) => void;
  setSpeed: (speed: number) => void;
}

const getDefaultInitialState = () => ({
  wallets: [] as Wallet[],
  selected: null,
  selectedCategory: null,
  speed: 0.5,
});

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<Store>(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
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
        if (get().selected !== wallet) {
          set({
            selectedCategory: null,
          });
        }
        set((state) => ({
          ...state,
          selected: wallet,
        }));
      },
      selectCategory: (category: any) => {
        set((state) => ({
          ...state,
          selectedCategory: category,
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
