import { configureStore, ThunkAction, Action, Reducer } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateT = ReturnType<typeof store.getState>;
export type AppDispatchT = typeof store.dispatch;

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;
