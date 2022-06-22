import React, { useState } from "react";
import PropTypes from "prop-types";

import "./HubForm.css";
import { CLUSTER_DOMAIN } from "../utils/app-config";
import { LinkButton } from "../common/LinkButton";
import { IconDrive, IconUsers } from "../common/icons";
import { formatMegabytes } from "../utils/formatNumber";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function HubNickname({ hub, setHub }) {
  const [nameValidity, setNameValidity] = useState({ valid: true });
  const max24Characters = ".{1,24}";

  return (
    <div>
      <span className="form-section-title">Hub Nickname</span>
      {nameValidity.valid || nameValidity.valueMissing ? (
        <span className="form-section-subtitle">For use within the dashboard area only</span>
      ) : (
        <span className="form-section-subtitle invalid">Hub name too long (24 characters max)</span>
      )}
      <input
        type="text"
        value={hub.name}
        required
        pattern={max24Characters}
        onChange={(e) => {
          setNameValidity(e.target.validity);
          setHub({ ...hub, name: e.target.value });
        }}
      />
    </div>
  );
}
HubNickname.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
};

export function HubForm({ hub, setHub, isSubmitting, onSubmit }) {

  const tierChoices = [
    { tier: "free", disabled: true, ccuLimit: 5, storageLimitMb: 250 },
    { tier: "mvp", disabled: false, ccuLimit: null, storageLimitMb: null },
  ];

  const toastConfig = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(hub).then(resp => {
      const errorMessage = 'There was an error updating your hub';
      const succesMessage = 'Hub has been updated';

      resp.error ? toast.error(errorMessage, toastConfig) : toast.success(succesMessage, toastConfig);
    });
  };

  return (
    <div className="hub-form-container">
      <form className="hub-form" onSubmit={onFormSubmit}>
        <HubNickname hub={hub} setHub={setHub} />

        <div>
          <span className="form-section-title">Hub Tier</span>
          <span className="form-section-subtitle">Hub tiers vary in visitor capacity and asset storage space</span>
          {tierChoices.map((tierChoice) => (
            <label
              key={tierChoice.tier}
              className={`tier-choice ${tierChoice.disabled && "disabled"} ${hub.tier === tierChoice.tier && "selected"
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
                <span>{tierChoice.ccuLimit || "-"}</span>
              </div>
              <div>
                <IconDrive />
                <span>{formatMegabytes(tierChoice.storageLimitMb)}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="web-address">
          <div className="web-address-header">
            <span className="form-section-title">Web Address (URL)</span>
            <span className="form-section-subtitle">
              Supports letters (a to z), digits (0 to 9), and hyphens&nbsp;(-)
            </span>
          </div>
          <div className="web-address-input">
            <input type="text" value={hub.subdomain} onChange={(e) => setHub({ ...hub, subdomain: e.target.value })} />
            &nbsp;
            <span className="domain">
              <span className="subdomain">{hub.subdomain}</span>.{CLUSTER_DOMAIN}
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
        <span className="hub-form-summary-value">-</span>
        <span>Capacity</span>
        <span className="hub-form-summary-value">-</span>
      </div>
      <ToastContainer />
    </div>
  );
}

HubForm.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
  isSubmitting: PropTypes.bool,
  onSubmit: PropTypes.func,
};
