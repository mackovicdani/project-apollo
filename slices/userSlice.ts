import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user.model";

export interface UserState {
  value: any;
}

const initialState: UserState = {
  value: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    selectUser: (state, action: PayloadAction<User>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectUser } = userSlice.actions;

export default userSlice.reducer;
