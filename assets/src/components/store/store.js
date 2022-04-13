import { configureStore } from "@reduxjs/toolkit";

import { accountSlice } from "./account";
import { hubsSlice } from "./hubs";
import { hubsApi } from "../services/hubs";
import { accountApi } from "../services/account";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    hubs: hubsSlice.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [hubsApi.reducerPath]: hubsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hubsApi.middleware),
});
