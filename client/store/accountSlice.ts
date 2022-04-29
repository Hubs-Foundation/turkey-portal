import { createSlice } from "@reduxjs/toolkit"
import { StateT } from './store'

const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  profilePicture: '',
  displayName: '',
  email: '',
}

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccount(state, action) {
      if (!action.payload) return

      // Initialize Account Values
      const {profilePicture,displayName,email} = action.payload
      state.isLoggedIn = true
      state.profilePicture = profilePicture
      state.displayName = displayName
      state.email = email

    },
    logOut(state) {

      // Clear Account
      state.isLoggedIn = false
      state.profilePicture = ''
      state.displayName = ''
      state.email = ''

    },
  },
})

export const selectAccount = (state:StateT) => state.account
export const { setAccount, logOut } = accountSlice.actions
export default accountSlice.reducer