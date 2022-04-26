import { useDispatch, useSelector } from "react-redux";

import { useGetHubsQuery, useGetHubQuery } from "../services/hubs";
import { hubsSelectors, selectIsInitialized, setHub, setHubs } from "../store/hubs";

export function useHubs() {
  const dispatch = useDispatch();
  const hubs = useSelector((state) => hubsSelectors.selectAll(state));
  const isInitialized = useSelector(selectIsInitialized);
  const { data, isLoading, isError, isSuccess } = useGetHubsQuery({}, { skip: isInitialized });

  if (!isInitialized && data) dispatch(setHubs(data));

  const hasHubs = !!hubs.length;
  const isReady = isSuccess || isInitialized;

  return { hubs, hasHubs, isLoading, isError, isReady };
}

export function useHub(hub_id) {
  const dispatch = useDispatch();
  const hub = useSelector((state) => hubsSelectors.selectById(state, hub_id));

  const hasHub = !!hub;
  const { data, isLoading, isError, isSuccess } = useGetHubQuery({ hub_id }, { skip: hasHub });

  const dispatchSetHub = (hub) => dispatch(setHub(hub));
  if (!hasHub && data) dispatchSetHub(data);

  const isReady = isSuccess || hasHub;

  return { hub, hasHub, isLoading, isError, isReady, setHub: dispatchSetHub };
}
