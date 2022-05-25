import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useHubs } from "../hooks/hubs";
import { Hub } from "../display/Hub";
import { Spinner } from "../common/Spinner";
import { useCreateHubMutation } from "../services/hubs";
import { featureIsEnabled, CREATE_HUBS } from "../utils/feature-flags";
import { ForbiddenWrapper } from "../display/ForbiddenWrapper";
import { setForbidden } from "../store/hubs";

export function HomeContainer() {
  const { hubs, hasHubs, isLoading, isError, isReady, isForbidden } = useHubs();
  const dispatch = useDispatch();
  const [createHub] = useCreateHubMutation();

  useEffect(() => {
    dispatch(setForbidden(isForbidden));
  }, [isForbidden]);

  return (
    <div>
      <ForbiddenWrapper>
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
      </ForbiddenWrapper>
    </div>
  );
}
