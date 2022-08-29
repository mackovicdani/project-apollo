import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Wallet } from "../models/wallet.model";

export interface CounterState {
  value: any;
}

const initialState: CounterState = {
  value: null,
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    selectWallet: (state, action: PayloadAction<Wallet>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectWallet } = walletSlice.actions;

export default walletSlice.reducer;
