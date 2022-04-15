import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isInitialized: false,
    isLoggedIn: false,
    profilePicture: "",
    displayName: "",
    email: "",
  },
  reducers: {
    setAccount(state, action) {
      if (!action.payload) return;
      state.isLoggedIn = true;
      state.profilePicture = action.payload.profilePic;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.profilePicture = "";
      state.displayName = "";
      state.email = "";
    },
  },
});

export const selectAccount = (state) => state.account;

export const { setAccount, logOut } = accountSlice.actions;
