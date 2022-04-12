import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: { 
    isInitialized: false, 
    isLoggedIn: false
  },
  reducers: {
    setAccount(state, action) {
      state.isLoggedIn = !!action.payload.id;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  }
});

export const selectAccount = state => state.account;

export const { setAccount, logOut } = accountSlice.actions;
