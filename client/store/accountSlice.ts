import { createSlice } from '@reduxjs/toolkit';
import { AccountT } from 'types/General';
import { RootStateT } from './store';

const initialState: AccountT = {
  isInitialized: false,
  isLoggedIn: false,
  profilePic: '',
  displayName: '',
  email: '',
  hasSubscription: false,
  hasCreatingHubs: false,
  hasPlan: false,
  planName: null,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      if (!action.payload) return;

      // Initialize Account Values
      const {
        profilePic,
        displayName,
        email,
        hasSubscription,
        hasCreatingHubs,
        hasPlan,
        planName,
      } = action.payload;
      state.isLoggedIn = true;
      state.profilePic = profilePic;
      state.displayName = displayName;
      state.email = email;
      state.hasSubscription = hasSubscription;
      state.hasCreatingHubs = hasCreatingHubs;
      state.hasPlan = hasPlan;
      state.planName = planName;
    },
    logOut(state) {
      // Clear Account
      state.isLoggedIn = false;
      state.profilePic = '';
      state.displayName = '';
      state.email = '';
      state.hasSubscription = false;
      state.hasCreatingHubs = false;
      state.hasPlan = false;
      state.planName = null;
    },
  },
});

export const selectAccount = (state: RootStateT) => state.account;
export const { setAccount, logOut } = accountSlice.actions;
export default accountSlice.reducer;
