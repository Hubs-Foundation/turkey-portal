import React from "react";
import { useParams } from "react-router-dom";

import { useHub } from "../hooks/hubs";
import { Spinner } from "../common/Spinner";
import { HubForm } from "../display/HubForm";

export function HubContainer() {
  const { hubId } = useParams();
  const { currentHub, setCurrentHub, updateHub, isLoading, isError, isReady, isSubmitting } = useHub(hubId);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hub</span>}
      {isReady && !currentHub && <span>Hub not found</span>}
      {isReady && currentHub && (
        <HubForm hub={currentHub} setHub={setCurrentHub} isSubmitting={isSubmitting} onSubmit={updateHub} />
      )}
    </>
  );
}
