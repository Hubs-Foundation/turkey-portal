import { useDispatch, useSelector } from "react-redux";

import { useGetHubsQuery, useGetHubQuery, useUpdateHubMutation } from "../services/hubs";
import { hubEntitySelectors, setHubEntity, setHubEntities } from "../store/hubs";
import { selectCurrentHub, setCurrentHub } from "../store/currentHub";
import { useEffect } from "react";

export function useHubs() {
  const dispatch = useDispatch();
  const hubs = useSelector((state) => hubEntitySelectors.selectAll(state));
  const { data, isLoading, isError, isSuccess, refetch } = useGetHubsQuery({});

  useEffect(() => {
    if (data) dispatch(setHubEntities(data));
  }, [data]);

  const hasHubs = !!hubs.length;
  const isReady = isSuccess;

  return { hubs, hasHubs, isLoading, isError, isReady, refetchHubs: refetch };
}

export function useHub(hubId) {
  const dispatch = useDispatch();
  const hubEntity = useSelector((state) => hubEntitySelectors.selectById(state, hubId));

  const hasHubEntity = !!hubEntity;
  const { data, isLoading, isError, isSuccess } = useGetHubQuery({ hubId }, { skip: hasHubEntity });

  useEffect(() => {
    if (!hasHubEntity && data) dispatch(setHubEntity(data));
  }, [hasHubEntity, data]);

  const currentHub = useSelector(selectCurrentHub);
  if (hasHubEntity && !currentHub) dispatch(setCurrentHub(hubEntity));

  const [submitHub, { isLoading: isSubmitting }] = useUpdateHubMutation();

  const updateHub = (hub) => {
    return submitHub(hub).then((resp) => {
      if (!resp.error) {
        const updatedHub = resp.data;
        dispatch(setHubEntity(updatedHub));
      }
      return resp;
    });
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
