import { createEntityAdapter, createSlice, createSelector } from "@reduxjs/toolkit";
import { useGetHubsQuery, useGetHubQuery } from "../services/hubs";
import { useDispatch, useSelector } from "react-redux";

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

const selectInitialized = createSelector(state => state.hubs, state => state.initialized);

const hubsSelectors = hubsAdapter.getSelectors(state => state.hubs);

const { setHub, setHubs } = hubsSlice.actions;

export function useHubs(fxa_uid) {
  const dispatch = useDispatch();

  const hubs = useSelector(state => hubsSelectors.selectAll(state));

  const isInitialized = useSelector(selectInitialized);

  const { data, isLoading, isError, isSuccess } = useGetHubsQuery({fxa_uid}, {skip: isInitialized});

  if (!isInitialized && data) dispatch(setHubs(data));

  const hasHubs = !!hubs.length;

  const isReady = isSuccess || isInitialized;

  return { hubs, hasHubs, isLoading, isError, isReady };
}

export function useHub(fxa_uid, hub_id) {
  const dispatch = useDispatch();

  const hub = useSelector(state => hubsSelectors.selectById(state, hub_id));

  const hasHub = !!hub;

  const { data, isLoading, isError, isSuccess } = useGetHubQuery({fxa_uid, hub_id}, {skip: hasHub});

  const dispatchSetHub = hub => dispatch(setHub(hub));

  if (!hasHub && data) dispatchSetHub(data);

  const isReady = isSuccess || hasHub;

  return { hub, hasHub, isLoading, isError, isReady, setHub: dispatchSetHub };
}
