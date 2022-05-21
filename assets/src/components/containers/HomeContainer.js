import React from "react";
import PropTypes from "prop-types";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";
import { useCreateHubMutation } from "../services/hubs";
import { featureIsEnabled, CREATE_HUBS } from "../utils/feature-flags";
import { HubBuilding } from "../display/HubBuilding";

export function HomeContainer({ accountHasHubs }) {
  const { hubs, hasHubs, isLoading, isError, isReady } = useHubs();
  const [createHub] = useCreateHubMutation();
  return (
    <div>
      {isLoading &&
        (accountHasHubs ? (
          <Spinner />
        ) : (
          <>
            <Hub name="Untitled Hub" status="creating" />
            <HubBuilding />
          </>
        ))}
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
HomeContainer.propTypes = {
  accountHasHubs: PropTypes.bool,
};
