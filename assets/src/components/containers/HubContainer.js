import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useHub } from "../hooks/hubs";
import { Spinner } from "../common/Spinner";
import { HubForm } from "../display/HubForm";
import { STATUS_READY } from "../utils/hub-constants";

export function HubContainer() {
  const navigate = useNavigate();
  const { hubId } = useParams();
  const { currentHub, setCurrentHub, updateHub, isLoading, isError, isReady, isSubmitting } = useHub(hubId);

  const currentHubIsReady = !currentHub || currentHub.status === STATUS_READY;

  useEffect(() => {
    if (!currentHubIsReady) {
      navigate("/");
    }
  }, [currentHubIsReady]);

  return (
    <>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hub</span>}
      {isReady && !currentHub && <span>Hub not found</span>}
      {isReady && currentHub && currentHubIsReady && (
        <HubForm hub={currentHub} setHub={setCurrentHub} isSubmitting={isSubmitting} onSubmit={updateHub} />
      )}
    </>
  );
}
