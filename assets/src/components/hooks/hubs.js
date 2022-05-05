import { useDispatch, useSelector } from "react-redux";

import { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation, useGetHubUsageStatsMutation } from "../services/hubs";
import { hubEntitySelectors, selectIsInitialized, setHubEntity, setHubEntities, setHubUsageStats } from "../store/hubs";
import { selectCurrentHub, setCurrentHub } from "../store/currentHub";

export function useHubs() {
  const dispatch = useDispatch();
  const hubs = useSelector((state) => hubEntitySelectors.selectAll(state));
  const isInitialized = useSelector(selectIsInitialized);
  const { data, isLoading, isError, isSuccess } = useGetHubsQuery({}, { skip: isInitialized });

  if (!isInitialized && data) dispatch(setHubEntities(data));

  const hasHubs = !!hubs.length;
  const isReady = isSuccess || isInitialized;

  return { hubs, hasHubs, isLoading, isError, isReady };
}

function setUsageStats() {
  const dispatch = useDispatch();
  const hubs = useSelector((state) => hubEntitySelectors.selectAll(state));
  
  hubs.map(hub => new Promise((resolve, reject) => {
    const { data } = useGetHubUsageStatsMutation(hub)
    console.log("SETUSAGESTATS(): hub id", hub.hub_id)
    console.log(data)
    if (data) resolve(dispatch(setHubUsageStats({id: hub.hub_id, data})))
  }))
}

export function useHub(hub_id) {
  const dispatch = useDispatch();
  const hubEntity = useSelector((state) => hubEntitySelectors.selectById(state, hub_id));

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
    currentHub,
    setCurrentHub: (hub) => dispatch(setCurrentHub(hub)),
    updateHub,
    isLoading,
    isError,
    isReady,
    isSubmitting,
  };
}
