import { useQuery, useMutation } from "./utils/query-mutation";

// TODO Remove when the backend actually supplies these values.
function addFakeProperties(hubs) {
  for (const hub of hubs) {
    hub.current_ccu = Math.floor(Math.random() * hub.ccu_limit);
    hub.storage_usage_mb = Math.floor(Math.random() * hub.storage_limit_mb);
  }
  return hubs;
}

export function useHubs(fxa_uid) {
  return useQuery(`/api/v1/hubs?fxa_uid=${fxa_uid}`, addFakeProperties);
}

export function useHub(fxa_uid, hub_id) {
  // TODO Replace with proper fetch for single hub
  return useQuery(
    `/api/v1/hubs?fxa_uid=${fxa_uid}`,
     hubs => addFakeProperties(hubs).find((hub) => hub.hub_id.toString() === hub_id) || {}
  );
}

export function useUpdateHub(fxa_uid, hub_id) {
  return useMutation(`/api/v1/hubs/${hub_id}?fxa_uid=${fxa_uid}`);
}
