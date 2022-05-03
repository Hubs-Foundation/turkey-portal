import React from "react";
import PropTypes from "prop-types";

import "./HubForm.css";
import { LinkButton } from "../common/LinkButton";
import { IconDrive, IconUsers } from "../common/icons";
import { formatMegabytes } from "../utils/formatNumber";

export function HubForm({ hub, setHub, isSubmitting, onSubmit }) {
  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(hub);
  };

  const tierChoices = [
    { tier: "free", disabled: true, ccuLimit: 5, storageLimitMb: 250 },
    { tier: "mvp", disabled: false, ccuLimit: 30, storageLimitMb: 2000 },
  ];

  return (
    <div className="hub-form-container">
      <form className="hub-form" onSubmit={onFormSubmit}>
        <div>
          <span className="form-section-title">Hub Name</span>
          <input type="text" value={hub.name} onChange={(e) => setHub({ ...hub, name: e.target.value })} />
        </div>

        <div>
          <span className="form-section-title">Hub Tier</span>
          {tierChoices.map((tierChoice) => (
            <label
              key={tierChoice.tier}
              className={`tier-choice ${tierChoice.disabled && "disabled"} ${
                hub.tier === tierChoice.tier && "selected"
              }`}
            >
              <div>
                <input
                  type="radio"
                  name="tier"
                  disabled={tierChoice.disabled}
                  checked={hub.tier === tierChoice.tier}
                  onChange={() => setHub({ ...hub, tier: tierChoice.tier })}
                />
                <span className={`tag ${tierChoice.tier}`}>{tierChoice.tier}</span>
              </div>
              <div>
                <IconUsers />
                <span>{tierChoice.ccuLimit}</span>
              </div>
              <div>
                <IconDrive />
                <span>{formatMegabytes(tierChoice.storageLimitMb)}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="web-address">
          <span className="form-section-title">Web Address (URL)</span>
          <input type="text" value={hub.subdomain} onChange={(e) => setHub({ ...hub, subdomain: e.target.value })} />
          <span className="form-section-subtitle">Preview</span>
          <div>
            <span className="domain">
              <span className="subdomain">{hub.subdomain}</span>.myhubs.net
            </span>
          </div>
        </div>

        <hr />

        <div className="form-buttons">
          <LinkButton to={`/`} text="Back" />
          <button className="primary" disabled={isSubmitting}>
            {isSubmitting ? "Updating" : "Update"}
          </button>
        </div>
      </form>

      <div className="hub-form-summary">
        <span>Summary</span>
        <span>Tier</span>
        <span className={`tag ${hub.tier}`}>{hub.tier}</span>
        <span>People</span>
        <span>{hub.ccu_limit}</span>
        <span>Capacity</span>
        <span>{formatMegabytes(hub.storage_limit_mb)}</span>
      </div>
    </div>
  );
}

HubForm.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
};
