import React from "react";
import PropTypes from "prop-types";

import "./HubForm.css";
import { FormChoice } from "../common/FormChoice";
import { formatNumber } from "../utils/formatNumber";

export function HubForm({hub, setHub, isSubmitting, onSubmit}) {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(hub);
  };

  const storageChoices = [1000, 5000, 10000].map(value => {
    return {value, disabled: value < hub.storage_usage_mb};
  });

  const choiceDisabled = storageChoices.some(choice => choice.disabled);

  const isFreeTier = hub.tier === "free";

  return (
  <form className="hub-form" onSubmit={onFormSubmit}>
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
      <span className="warning">
        ⚠️ You cannot choose storage options lower than your current usage.
      </span>
    }

    <FormChoice
      name="storage"
      title={`Storage (${formatNumber(hub.storage_usage_mb)} MB used)`}
      value={hub.storage_limit_mb}
      choices={storageChoices}
      allDisabled={isFreeTier}
      onChange={(value) => setHub({ ...hub, storage_limit_mb: value })}
    />

    <button disabled={isSubmitting}>{isSubmitting ? "saving" : "save"}</button>
  </form>
  );
}

HubForm.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
};
