import { useDispatch, useSelector } from "react-redux";

import { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation } from "../services/hubs";
import { hubsSelectors, selectIsInitialized, setHub as setHubEntity, setHubs } from "../store/hubs";
import { selectCurrentHub, setCurrentHub } from "../store/currentHub";

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
  const hubEntity = useSelector((state) => hubsSelectors.selectById(state, hub_id));

  const hasHubEntity = !!hubEntity;
  const { data, isLoading, isError, isSuccess } = useGetHubQuery({ hub_id }, { skip: hasHubEntity });

  if (!hasHubEntity && data) dispatch(setHubEntity(data));

  const currentHub = useSelector(selectCurrentHub);
  if (hasHubEntity && !currentHub) dispatch(setCurrentHub(hubEntity));

  const [submitHub, { isLoading: isSubmitting }] = useUpdateHubMutation();

  const updateHub = async (hub) => {
    await submitHub(hub);
    dispatch(setHubEntity(hub));
  };

  const isReady = isSuccess || currentHub;

  return {
    hub: currentHub,
    setHub: (hub) => dispatch(setCurrentHub(hub)),
    updateHub,
    isLoading,
    isError,
    isReady,
    isSubmitting,
  };
}
