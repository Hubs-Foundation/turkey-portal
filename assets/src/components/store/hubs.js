import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const hubEntityAdapter = createEntityAdapter({
  selectId: (hubEntity) => hubEntity.hubId,
});

export const hubEntitiesSlice = createSlice({
  name: "hubEntities",
  initialState: hubEntityAdapter.getInitialState(),
  reducers: {
    setHubEntity(state, action) {
      hubEntityAdapter.setOne(state, action.payload);
    },
    setHubEntities(state, action) {
      hubEntityAdapter.setAll(state, action.payload);
    },
  },
});

export const hubEntitySelectors = hubEntityAdapter.getSelectors((state) => state.hubEntities);

export const { setHubEntity, setHubEntities, setForbidden } = hubEntitiesSlice.actions;
