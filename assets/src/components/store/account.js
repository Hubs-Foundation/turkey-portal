import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isInitialized: false,
    isLoggedIn: false,
    profilePicture: null,
    displayName: null,
  },
  reducers: {
    setAccount(state, action) {
      state.isLoggedIn = !!action.payload.id;
      state.profilePicture = action.payload.profile_pic;
      state.displayName = action.payload.display_name;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
  },
});

export const selectAccount = (state) => state.account;

export const { setAccount, logOut } = accountSlice.actions;
