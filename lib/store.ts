import { useLayoutEffect } from "react";
import create, { UseBoundStore } from "zustand";
import createContext from "zustand/context";
import { combine } from "zustand/middleware";
import { Notification } from "../models/types/types";
import { Wallet } from "../models/wallet.model";
const crypto = require("crypto");

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
  notifications: Notification[];
  setWallets: (wallets: Wallet[]) => void;
  addWallet: (wallet: any) => void;
  selectWallet: (wallet: any) => void;
  selectCategory: (category: any) => void;
  setSpeed: (speed: number) => void;
  addNotification: (notification: Notification) => void;
}

const getDefaultInitialState = () => ({
  wallets: [] as Wallet[],
  selected: null,
  selectedCategory: null,
  speed: 0.5,
  notifications: [] as Notification[],
});

const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const initializeStore = (preloadedState = {}) => {
  return create<Store>(
    combine({ ...getDefaultInitialState(), ...preloadedState }, (set, get) => ({
      setWallets: (wallets) => {
        set({
          wallets,
        });
      },
      addWallet: (wallet) => {
        set((state) => ({
          ...state,
          wallets: addWallet(state.wallets, wallet),
        }));
      },
      selectWallet: (wallet) => {
        if (get().selected !== wallet) {
          set({ selectedCategory: null });
        }
        set((state) => ({
          ...state,
          selected: wallet,
        }));
      },
      selectCategory: (category) => {
        set((state) => ({
          ...state,
          selectedCategory: category,
        }));
      },
      setSpeed: (speed) => {
        set({
          speed: speed,
        });
      },
      addNotification: (newNotification: Notification) => {
        newNotification.index = crypto.randomBytes(5).toString("hex");
        set((state) => ({
          ...state,
          notifications: [newNotification, ...state.notifications],
        }));
        setTimeout(() => {
          set((state) => ({
            ...state,
            notifications: state.notifications.splice(
              0,
              state.notifications.length - 1
            ),
          }));
        }, 5000);
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

const removeFromNotifications = (
  notifications: Notification[],
  notification: any
): Notification[] => {
  const index = notifications.indexOf(notification);
  if (index > -1) {
    notifications.splice(index, 1);
  }
  return notifications;
};
