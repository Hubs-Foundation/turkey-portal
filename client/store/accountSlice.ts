import { createSlice } from '@reduxjs/toolkit';
import { RootStateT } from './store';
const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  profilePic: '',
  displayName: '',
  email: '',
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      if (!action.payload) return;

      // Initialize Account Values
      const { profilePic, displayName, email } = action.payload;
      state.isLoggedIn = true;
      state.profilePic = profilePic;
      state.displayName = displayName;
      state.email = email;
    },
    logOut(state) {
      // Clear Account
      state.isLoggedIn = false;
      state.profilePic = '';
      state.displayName = '';
      state.email = '';
    },
  },
});

export const selectAccount = (state: RootStateT) => state.account;
export const { setAccount, logOut } = accountSlice.actions;
export default accountSlice.reducer;
