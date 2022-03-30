import { useQuery, useMutation } from "./utils/query-mutation";

export function useHubs(fxa_uid) {
  return useQuery(`/api/v1/hubs?fxa_uid=${fxa_uid}`);
}

export function useHub(fxa_uid, hub_id) {
  // TODO Replace with proper fetch for single hub
  return useQuery(
    `/api/v1/hubs?fxa_uid=${fxa_uid}`,
     hubs => hubs.find((hub) => hub.hub_id.toString() === hub_id)
  );
}

export function useUpdateHub(fxa_uid, hub_id) {
  return useMutation(`/api/v1/hubs/${hub_id}?fxa_uid=${fxa_uid}`);
}
