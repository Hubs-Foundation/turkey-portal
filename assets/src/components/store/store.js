import { configureStore } from "@reduxjs/toolkit";

import { hubsApi } from "../services/hubs";
import { hubsSlice } from "./hubs";

export const store = configureStore({
  reducer: {
    hubs: hubsSlice.reducer,
    [hubsApi.reducerPath]: hubsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(hubsApi.middleware)
});
