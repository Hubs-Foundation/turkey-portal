import { useEffect, useState } from "react";

export function useHubs(fxa_uid) {
  const [hubs, setHubs] = useState([]);

  useEffect(async () => {
    setHubs(await fetch(`/api/v1/hubs?fxa_uid=${fxa_uid}`).then((r) => r.json()));
  }, []);

  return hubs;
}

export function useHub(fxa_uid, hub_id) {
  const [hub, setHub] = useState();

  useEffect(async () => {
    // TODO Replace with fetch for single hub
    const hubs = await fetch(`/api/v1/hubs?fxa_uid=${fxa_uid}`).then((r) => r.json());
    setHub(hubs.find((hub) => hub.hub_id.toString() === hub_id));
  }, []);

  return [hub, setHub];
}

export function useUpdateHub() {
  const [updating, setUpdating] = useState(false);

  const updateHub = async (fxa_uid, hub_id, hub) => {
    setUpdating(true);
    await fetch(`/api/v1/hubs/${hub_id}?fxa_uid=${fxa_uid}`, {
      headers: { "content-type": "application/json" },
      method: "PATCH",
      body: JSON.stringify({ hub: hub }),
    });
    setUpdating(false);
  };

  return [updateHub, updating];
}
