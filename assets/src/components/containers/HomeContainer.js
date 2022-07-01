import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";
import { useCreateHubMutation } from "../services/hubs";
import { selectAccount } from "../store/account";
import { setCurrentHub } from "../store/currentHub";
import { featureIsEnabled, CREATE_HUBS } from "../utils/feature-flags";
import { HubBuilding } from "../display/HubBuilding";
import { HubUpdating } from "../display/HubUpdating";
import { STATUS_CREATING, STATUS_UPDATING } from "../utils/hub-constants";

function HubLoading({ isBuildingHub }) {
  return isBuildingHub ? (
    <>
      <Hub name="Untitled Hub" status={STATUS_CREATING} />
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
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const { hubs, hasHubs, isLoading, isError, isReady, refetchHubs } = useHubs();
  const [createHub] = useCreateHubMutation();

  const hasUpdatingHub = hasHubs && hubs[0].status === STATUS_UPDATING;

  useEffect(() => {
    let updateIntervalId;
    if (hasUpdatingHub) {
      updateIntervalId = setInterval(refetchHubs, 1000);
    }
    return () => clearInterval(updateIntervalId);
  }, [hasUpdatingHub]);

  // Reset current hub every time we load the home page, so that the form
  // doesn't show unsubmitted changes.
  useEffect(() => {
    dispatch(setCurrentHub(null));
  });

  return (
    <div>
      {isLoading ? <HubLoading isBuildingHub={!account.hasHubs || account.hasCreatingHubs} /> : ""}
      {isError && <span>Unable to load Hubs</span>}
      {isReady &&
        (!hasHubs ? (
          <span>You don&apos;t have any hubs</span>
        ) : (
          <>
            {hubs.map((hub) => (
              <Hub key={hub.hubId} {...hub} />
            ))}
            {hasUpdatingHub && <HubUpdating />}
          </>
        ))}
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
