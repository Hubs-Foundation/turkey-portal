import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";

const hubEntityAdapter = createEntityAdapter({
  selectId: (hubEntity) => hubEntity.hubId,
});

export const hubEntitiesSlice = createSlice({
  name: "hubEntities",
  initialState: hubEntityAdapter.getInitialState({
    isInitialized: false,
    isForbidden: false,
  }),
  reducers: {
    setHubEntity(state, action) {
      hubEntityAdapter.setOne(state, action.payload);
    },
    setHubEntities(state, action) {
      state.isInitialized = true;
      hubEntityAdapter.setAll(state, action.payload);
    },
    setForbidden(state, action) {
      return {...state, isForbidden: true}
    },
  },
});

export const selectIsInitialized = createSelector(
  (state) => state.hubEntities,
  (state) => state.isInitialized,
);

export const hubEntitySelectors = hubEntityAdapter.getSelectors((state) => state.hubEntities);

export const { setHubEntity, setHubEntities, setForbidden } = hubEntitiesSlice.actions;
