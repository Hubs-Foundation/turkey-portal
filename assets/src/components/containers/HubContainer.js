import React from "react";
import { useParams } from "react-router-dom";

import { useHub } from "../hooks/hubs";
import { Spinner } from "../common/Spinner";
import { HubForm } from "../display/HubForm";

export function HubContainer() {
  const { hub_id } = useParams();
  const { hub, setHub, updateHub, isLoading, isError, isReady, isSubmitting } = useHub(hub_id);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hub</span>}
      {isReady && !hub && <span>Hub not found</span>}
      {isReady && hub && <HubForm hub={hub} setHub={setHub} isSubmitting={isSubmitting} onSubmit={updateHub} />}
    </>
  );
}
