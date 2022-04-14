import { configureStore } from "@reduxjs/toolkit";

import { accountSlice } from "./account";
import { hubsSlice } from "./hubs";
import { currentHubSlice } from "./currentHub";
import { hubsApi } from "../services/hubs";
import { accountApi } from "../services/account";

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    hubs: hubsSlice.reducer,
    currentHub: currentHubSlice.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    [hubsApi.reducerPath]: hubsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(hubsApi.middleware).concat(accountApi.middleware),
});
