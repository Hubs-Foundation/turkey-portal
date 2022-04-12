import React, { useContext } from "react";

import { FxaUidContext } from "../FxaUidContext";
import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";

export function HomeContainer() {
  const fxa_uid = useContext(FxaUidContext);

  const { hubs, hasHubs, isLoading, isError, isReady } = useHubs(fxa_uid);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hubs</span>}
      {isReady &&
        (!hasHubs ? (
          <span>You don&apos;t have any hubs</span>
        ) : (
          hubs.map((hub) => (
            <Hub key={hub.hub_id} fxa_uid={fxa_uid} {...hub} />
          ))
        ))}
    </>
  );
}
