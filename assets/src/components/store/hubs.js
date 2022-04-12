import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";

const hubsAdapter = createEntityAdapter({
  selectId: hub => hub.hub_id
});

export const hubsSlice = createSlice({
  name: "hubs",
  initialState: hubsAdapter.getInitialState({
    isInitialized: false
  }),
  reducers: {
    setHub(state, action) {
      hubsAdapter.setOne(state, action.payload);
    },
    setHubs(state, action) {
      state.isInitialized = true;
      hubsAdapter.setAll(state, action.payload);
    },
  }
});

export const selectIsInitialized = createSelector(state => state.hubs, state => state.isInitialized);

export const hubsSelectors = hubsAdapter.getSelectors(state => state.hubs);

export const { setHub, setHubs } = hubsSlice.actions;
