import React from "react";
import { useParams } from "react-router-dom";

import { useHub } from "../hooks/hubs";
import { Spinner } from "../common/Spinner";
import { HubForm } from "../display/HubForm";
import { ForbiddenWrapper } from "../display/ForbiddenWrapper";
import { useDispatch } from "react-redux";
import { setForbidden } from "../store/hubs";

export function HubContainer() {
  const { hubId } = useParams();
  const { currentHub, setCurrentHub, updateHub, isLoading, isError, isReady, isSubmitting, isForbidden } =
    useHub(hubId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setForbidden(isForbidden));
  }, [isForbidden]);

  return (
    <ForbiddenWrapper>
      {isLoading && <Spinner />}
      {isError && <span>Unable to load Hub</span>}
      {isReady && !currentHub && <span>Hub not found</span>}
      {isReady && currentHub && (
        <HubForm hub={currentHub} setHub={setCurrentHub} isSubmitting={isSubmitting} onSubmit={updateHub} />
      )}
    </ForbiddenWrapper>
  );
}
