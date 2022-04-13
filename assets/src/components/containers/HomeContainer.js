import React from "react";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";

export function HomeContainer() {
  const { hubs, hasHubs, isLoading, isError, isReady } = useHubs();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hubs</span>}
      {isReady &&
        (!hasHubs ? <span>You don&apos;t have any hubs</span> : hubs.map((hub) => <Hub key={hub.hub_id} {...hub} />))}
    </>
  );
}
