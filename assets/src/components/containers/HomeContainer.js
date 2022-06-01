import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";
import { useCreateHubMutation } from "../services/hubs";
import { selectAccount } from "../store/account";
import { featureIsEnabled, CREATE_HUBS } from "../utils/feature-flags";
import { HubBuilding } from "../display/HubBuilding";
import { CREATING } from "../utils/hub-constants";

function HubLoading({ isBuildingHub }) {
  return isBuildingHub ? (
    <>
      <Hub name="Untitled Hub" status={CREATING} />
      <HubBuilding />
    </>
  ) : (
    <Spinner />
  );
}
HubLoading.propTypes = {
  isBuildingHub: PropTypes.bool,
};

export function HomeContainer() {
  const account = useSelector(selectAccount);
  const { hubs, hasHubs, isLoading, isError, isReady } = useHubs();
  const [createHub] = useCreateHubMutation();

  return (
    <div>
      {isLoading && <HubLoading isBuildingHub={!account.hasHubs} />}
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
