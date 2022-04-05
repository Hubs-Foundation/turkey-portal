import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { FxaUidContext } from "./FxaUidContext";
import { useHub, useUpdateHub } from "./hub-hooks";
import { FormChoice } from "./FormChoice";
import { formatNumber } from "./utils";

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

  const storageChoices = [1000, 5000, 10000].map(value => {
    return {value, disabled: value < hub.storage_usage_mb};
  });

  const choiceDisabled = storageChoices.some(choice => choice.disabled);

  const isFreeTier = hub.tier === "free";

  return (
    <form className="hub-form" onSubmit={onSubmit}>
      <div>
        <span>Hub Name</span>
        <input value={hub.name} onChange={(e) => setHub({ ...hub, name: e.target.value })} />
      </div>

      <div>
        <span>Subdomain</span>
        <span className="domain">{hub.subdomain}.myhubs.net</span>
      </div>

      <FormChoice
        name="tier"
        value={hub.tier}
        choices={[{value: "free"}, {value: "premium"}]}
        onChange={(value) => setHub({ ...hub, tier: value })}
      />

      <FormChoice
        name="ccu"
        title="CCU"
        value={hub.ccu_limit}
        choices={[{value: 25}, {value: 50}, {value: 100}]}
        allDisabled={isFreeTier}
        onChange={(value) => setHub({ ...hub, ccu_limit: value })}
      />

      {
        !isFreeTier &&
        choiceDisabled &&
        <span className="warning">⚠️ You cannot choose storage options lower than your current usage.</span>
      }

      <FormChoice
        name="storage"
        title={`Storage (${formatNumber(hub.storage_usage_mb)} MB used)`}
        value={hub.storage_limit_mb}
        choices={storageChoices}
        allDisabled={isFreeTier}
        onChange={(value) => setHub({ ...hub, storage_limit_mb: value })}
      />

      <button disabled={updating}>{updating ? "saving" : "save"}</button>
    </form>
  );
}
