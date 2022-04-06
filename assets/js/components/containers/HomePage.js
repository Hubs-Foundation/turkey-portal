import React, { useContext } from "react";

import { FxaUidContext } from "../FxaUidContext";
import { useHubs } from "../utils/hub-hooks";
import { Hub } from "../display/Hub";
import { Spinner } from "../display/Spinner";

export function HomePage() {
  const fxa_uid = useContext(FxaUidContext);

  const { data: hubs, loading, error, success } = useHubs(fxa_uid);

  const hasHubs = hubs?.length;

  return (
    <>
      {loading && <Spinner />}
      {error && <span>Unable to load Hubs</span>}
      {success && 
        (!hasHubs ? (
          <span>You don't have any hubs</span>
        ) : (
          hubs.map((hub) => (
            <Hub key={hub.hub_id} fxa_uid={fxa_uid} {...hub} />
          ))
        ))}
    </>
  );
}
