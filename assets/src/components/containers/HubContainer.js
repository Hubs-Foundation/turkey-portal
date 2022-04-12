import React from "react";
import { useParams } from "react-router-dom";

import { useHub } from "../hooks/hubs";
import { useUpdateHubMutation } from "../services/hubs";
import { Spinner } from "../common/Spinner";
import { HubForm } from "../display/HubForm";

export function HubContainer() {
  const { hub_id } = useParams();

  const {hub, hasHub, isLoading, isError, isReady, setHub} = useHub(hub_id);

  const [updateHub, { isLoading: isSubmitting }] = useUpdateHubMutation();

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hub</span>}
      {isReady &&
        (!hasHub ? (
          <span>Hub not found</span>
        ) : (
          <HubForm
            hub={hub}
            setHub={setHub}
            isSubmitting={isSubmitting}
            onSubmit={hub => updateHub({hub_id, hub})} />
        ))}
    </>
  );
}
