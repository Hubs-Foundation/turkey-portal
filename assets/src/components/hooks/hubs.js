import { useDispatch, useSelector } from "react-redux";

import { useGetHubsQuery, useGetHubQuery } from "../services/hubs";
import { hubsSelectors, selectInitialized, setHub, setHubs } from "../store/hubs";

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
