import React, { useContext } from "react";

import { FxaUidContext } from "./FxaUidContext";
import { useHubs } from "./hub-hooks";
import { Hub } from "./Hub";
import { Spinner } from "./Spinner";

export function HomePage() {
  const fxa_uid = useContext(FxaUidContext);

  const { data: hubs, loading, error } = useHubs(fxa_uid);

  if (loading) return <Spinner />;

  if (error) return "Unable to load Hubs";

  if (!hubs?.length) return "You don't have any hubs";

  return (
    <>
      {hubs.map((hub) => (
        <Hub key={hub.hub_id} fxa_uid={fxa_uid} {...hub} />
      ))}
    </>
  );
}
