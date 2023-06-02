import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import regionReducer from './regionSlice';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateT = ReturnType<typeof store.getState>;
export type AppDispatchT = typeof store.dispatch;

const store = configureStore({
  reducer: {
    account: accountReducer,
    region: regionReducer,
  },
});

export default store;
