import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation } from "../services/hubs";
import { hubEntitySelectors, selectIsInitialized, setHubEntity, setHubEntities } from "../store/hubs";
import { selectCurrentHub, setCurrentHub } from "../store/currentHub";

export function useHubs() {
  const dispatch = useDispatch();
  const hubs = useSelector((state) => hubEntitySelectors.selectAll(state));
  const isInitialized = useSelector(selectIsInitialized);
  const { data, error, isLoading, isError, isSuccess } = useGetHubsQuery({}, { skip: isInitialized });

  // TODO isForbidden should probably be an isAllowed property of the accounts API response.
  // Manage unauthorized email
  const isForbidden = isError && error.status === 403;

  const shouldUpdateHubEntities = !isInitialized && data;
  useEffect(() => {
    if (shouldUpdateHubEntities) {
      dispatch(setHubEntities(data));
    }
  }, [shouldUpdateHubEntities]);

  const hasHubs = !!hubs.length;
  const isReady = isSuccess || isInitialized;

  return { hubs, hasHubs, isLoading, isError, isReady, isForbidden };
}

export function useHub(hubId) {
  const dispatch = useDispatch();
  const hubEntity = useSelector((state) => hubEntitySelectors.selectById(state, hubId));

  const hasHubEntity = !!hubEntity;
  const { data, error, isLoading, isError, isSuccess } = useGetHubQuery({ hubId }, { skip: hasHubEntity });

  if (!hasHubEntity && data) dispatch(setHubEntity(data));

  // Manage unauthorized email
  const isForbidden = isError && error.status === 403;

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
    isForbidden,
  };
}
