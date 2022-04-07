import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";

const hubsAdapter = createEntityAdapter({
  selectId: hub => hub.hub_id
});

export const hubsSlice = createSlice({
  name: "hubs",
  initialState: hubsAdapter.getInitialState({
    initialized: false
  }),
  reducers: {
    setHub(state, action) {
      hubsAdapter.setOne(state, action.payload);
    },
    setHubs(state, action) {
      state.initialized = true;
      hubsAdapter.setAll(state, action.payload);
    },
  }
});

export const selectInitialized = createSelector(state => state.hubs, state => state.initialized);

export const hubsSelectors = hubsAdapter.getSelectors(state => state.hubs);

export const { setHub, setHubs } = hubsSlice.actions;
