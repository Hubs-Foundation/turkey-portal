import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { FxaUidContext } from "../FxaUidContext";
import { useHub, useUpdateHub } from "../utils/hub-hooks";
import { Spinner } from "../common/Spinner";
import { formatNumber } from "../utils/formatNumber";
import { HubForm } from "../display/HubForm";

export function HubContainer() {
  const fxa_uid = useContext(FxaUidContext);
  const { hub_id } = useParams();
  const {
    data: hub,
    setData: setHub,
    loading,
    error,
    success,
  } = useHub(fxa_uid, hub_id);
  const { mutate: updateHub, loading: updating } = useUpdateHub(
    fxa_uid,
    hub_id
  );

  return (
    <>
      {loading && <Spinner />}
      {error && <span>Unable to load Hub</span>}
      {success &&
        (!hub ? (
          <span>Hub not found</span>
        ) : (
          <HubForm
            hub={hub}
            setHub={setHub}
            onSubmit={updateHub}
            updating={updating}
          />
        ))}
    </>
  );
}
