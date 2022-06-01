import React from "react";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";
import { useCreateHubMutation } from "../services/hubs";
import { featureIsEnabled, CREATE_HUBS } from "../utils/feature-flags";

export function HomeContainer() {
  const { hubs, hasHubs, isLoading, isError, isReady } = useHubs();
  const [createHub] = useCreateHubMutation();

  return (
    <div>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hubs</span>}
      {isReady &&
        (!hasHubs ? <span>You don&apos;t have any hubs</span> : hubs.map((hub) => <Hub key={hub.hubId} {...hub} />))}
      {featureIsEnabled(CREATE_HUBS) && (
        <button
          onClick={() => {
            createHub({});
          }}
        >
          Create Hub
        </button>
      )}
    </div>
  );
}
