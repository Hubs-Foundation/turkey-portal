import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { FxaUidContext } from "./FxaUidContext";
import { useHub, useUpdateHub } from "./hub-hooks";
import { FormChoice } from "./FormChoice";
import { Spinner } from "./Spinner";

export function HubPage() {
  const fxa_uid = useContext(FxaUidContext);
  const { hub_id } = useParams();
  const {data: hub, setData: setHub, loading, error}  = useHub(fxa_uid, hub_id);
  const {mutate: updateHub, loading: updating} = useUpdateHub(fxa_uid, hub_id);

  const onSubmit = (e) => {
    e.preventDefault();
    updateHub(hub);
  };

  if (loading) return <Spinner />

  if (error) return "Unable to load Hub";

  if (!hub) return "Hub not found";

  return (
    <form className="hub-form" onSubmit={onSubmit}>
      <div>
        <span>Hub Name</span>
        <input value={hub.name} onChange={(e) => setHub({ ...hub, name: e.target.value })} />
      </div>

      <div>
        <span>Subdomain</span>
        <span>{hub.subdomain}.myhubs.net</span>
      </div>

      <FormChoice
        name="tier"
        value={hub.tier}
        choices={["free", "premium"]}
        onChange={(value) => setHub({ ...hub, tier: value })}
      />

      <FormChoice
        name="ccu"
        value={hub.ccu_limit}
        choices={[25, 50, 100]}
        disabled={hub.tier === "free"}
        onChange={(value) => setHub({ ...hub, ccu_limit: value })}
      />

      <FormChoice
        name="storage"
        value={hub.storage_limit_mb}
        choices={[1000, 5000, 10000]}
        disabled={hub.tier === "free"}
        onChange={(value) => setHub({ ...hub, storage_limit_mb: value })}
      />

      <button disabled={updating}>{updating ? "saving" : "save"}</button>
    </form>
  );
}
