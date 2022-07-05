import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isInitialized: false,
    isLoggedIn: false,
    isForbidden: false,
    hasHubs: false,
    hasCreatingHubs: false,
    profilePicture: "",
    displayName: "",
    email: "",
  },
  reducers: {
    setAccount(state, action) {
      if (!action.payload) return;
      state.isLoggedIn = true;
      state.hasHubs = action.payload.hasHubs;
      state.profilePicture = action.payload.profilePic;
      state.displayName = action.payload.displayName;
      state.email = action.payload.email;
      state.isForbidden = action.payload.isForbidden;
      state.hasCreatingHubs = action.payload.hasCreatingHubs;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.isForbidden = false;
      state.hasHubs = false;
      state.profilePicture = "";
      state.displayName = "";
      state.email = "";
      state.hasCreatingHubs = false;
    },
  },
});

export const selectAccount = (state) => state.account;

export const { setAccount, logOut } = accountSlice.actions;
