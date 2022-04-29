import { configureStore, ThunkAction, Action,Reducer } from '@reduxjs/toolkit'
import accountReducer from './accountSlice'

// Update this type when adding a new reducer
export type StateT = {
  account:Reducer
}

const store = configureStore({
  reducer:{
    account:accountReducer
  }
})

export default store


