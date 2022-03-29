import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { FxaUidContext } from "./FxaUidContext";
import { useHub, useUpdateHub } from "./hub-hooks";
import { FormChoice } from "./FormChoice";
import { format } from "./utils";

export function HubPage() {
  const fxa_uid = useContext(FxaUidContext);
  const { hub_id } = useParams();
  const [hub, setHub] = useHub(fxa_uid, hub_id);
  const [updateHub, updating] = useUpdateHub();

  const onSubmit = (e) => {
    e.preventDefault();
    updateHub(fxa_uid, hub_id, hub);
  };

  if (!hub) return "";

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
        title={`Storage (${format(hub.storage_usage_mb)} MB used)`}
        value={hub.storage_limit_mb}
        choices={[1000, 5000, 10000]}
        disabled={hub.tier === "free"}
        onChange={(value) => setHub({ ...hub, storage_limit_mb: value })}
      />

      <button disabled={updating}>{updating ? "saving" : "save"}</button>
    </form>
  );
}
