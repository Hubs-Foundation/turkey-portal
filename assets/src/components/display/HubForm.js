import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";

import "./HubForm.css";
import { CLUSTER_DOMAIN } from "../utils/app-config";
import { LinkButton } from "../common/LinkButton";
import { Spinner } from "../common/Spinner";
import { IconDrive, IconUsers, IconValid, IconInvalid } from "../common/icons";
import { formatMegabytes } from "../utils/formatNumber";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HubNickname({ hub, setHub, onValidationUpdate }) {
  const [validationMessage, setValidationMessage] = useState("");

  function validate(name) {
    const trimmedName = name.trim();

    let newValidationMessage = "";
    if (trimmedName.length === 0) {
      newValidationMessage = "Hub nickname is required";
    } else if (trimmedName.length >= 24) {
      newValidationMessage = "Hub nickname too long (24 characters max)";
    }

    setValidationMessage(newValidationMessage);
    onValidationUpdate(newValidationMessage);
  }

  return (
    <div>
      <span className="form-section-title">Hub Nickname</span>
      {validationMessage ? (
        <span className="form-section-subtitle invalid">{validationMessage}</span>
      ) : (
        <span className="form-section-subtitle">For use within the dashboard area only</span>
      )}
      <input
        type="text"
        value={hub.name}
        className={validationMessage === "" ? "" : "invalid"}
        onChange={(e) => {
          validate(e.target.value);
          setHub({ ...hub, name: e.target.value });
        }}
      />
    </div>
  );
}
HubNickname.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
  onValidationUpdate: PropTypes.func,
};

function HubWebAddress({ hub, setHub, onValidationUpdate }) {
  const [validationMessage, setValidationMessage] = useState("");
  const [validating, setValidating] = useState(false);

  function setAndEmitValidation(message) {
    setValidationMessage(message);
    onValidationUpdate(message);
  }

  const debounceWaitMs = 100;
  const validate = useCallback(
    debounce(async function (subdomain) {
      let clientValidationMessage = "";
      if (subdomain.length < 3) {
        clientValidationMessage = "Must be at least 3 characters";
      } else if (subdomain.startsWith("-") || subdomain.endsWith("-")) {
        clientValidationMessage = "Cannot start or end with a hyphen (-)";
      } else if (/[^a-zA-Z0-9-]+/.test(subdomain)) {
        clientValidationMessage = "Only supports letters (a to z), digits (0 to 9), and hyphens (-)";
      }

      if (clientValidationMessage === "") {
        const result = await fetch("/api/v1/hubs/validate_subdomain", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            excludedHubId: hub.hubId,
            subdomain,
          }),
        }).then((r) => r.json());

        if (result.success) {
          setAndEmitValidation("");
        } else {
          setAndEmitValidation("Web address unavailable");
        }
      } else {
        setAndEmitValidation(clientValidationMessage);
      }

      setValidating(false);
    }, debounceWaitMs),
    [hub.hubId]
  );

  return (
    <div className="web-address">
      <div className="web-address-header">
        <span className="form-section-title">Web Address (URL)</span>
        {validationMessage ? (
          <span className="form-section-subtitle invalid">{validationMessage}</span>
        ) : (
          <span className="form-section-subtitle">
            Supports letters (a to z), digits (0 to 9), and hyphens&nbsp;(-)
          </span>
        )}
      </div>
      <div className="web-address-input">
        <input
          type="text"
          className={validationMessage === "" ? "" : "invalid"}
          value={hub.subdomain}
          onChange={(e) => {
            setHub({ ...hub, subdomain: e.target.value });

            // Emit a message so that the form cannot be submitted during validation.
            onValidationUpdate("validating");
            setValidating(true);
            validate(e.target.value);
          }}
        />
        {validating ? <Spinner isInline={true} /> : validationMessage ? <IconInvalid /> : <IconValid />}
        <span className="domain">
          <span className="subdomain">{hub.subdomain.toLowerCase()}</span>.{CLUSTER_DOMAIN}
        </span>
      </div>
    </div>
  );
}
HubWebAddress.propTypes = {
  hub: PropTypes.object,
  setHub: PropTypes.func,
  onValidationUpdate: PropTypes.func,
};

export function HubForm({ hub, setHub, isSubmitting, onSubmit }) {
  const navigate = useNavigate();
  const [inputValidation, setInputValidation] = useState({});

  const tierChoices = [
    { tier: "free", disabled: true, ccuLimit: 5, storageLimitMb: 250 },
    { tier: "mvp", disabled: false, ccuLimit: null, storageLimitMb: null },
  ];

  const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
    theme: "colored",
  };

  const updateInputValidation = (updatedValidation) => {
    setInputValidation((inputValidation) => ({ ...inputValidation, ...updatedValidation }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(hub).then((resp) => {
      const errorMessage = "There was an error updating your hub";

      if (resp.error) {
        toast.error(errorMessage, toastConfig);
      } else {
        navigate("/");
      }
    });
  };

  const allInputsValid = Object.values(inputValidation).every((message) => message === "");
  const submitEnabled = !isSubmitting && allInputsValid;

  return (
    <div className="hub-form-container">
      <form className="hub-form" onSubmit={onFormSubmit}>
        <HubNickname
          hub={hub}
          setHub={setHub}
          onValidationUpdate={(message) => updateInputValidation({ nickname: message })}
        />

        <div>
          <span className="form-section-title">Hub Tier</span>
          <span className="form-section-subtitle">Hub tiers vary in visitor capacity and asset storage space</span>
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
                <span>{tierChoice.ccuLimit || "-"}</span>
              </div>
              <div>
                <IconDrive />
                <span>{formatMegabytes(tierChoice.storageLimitMb)}</span>
              </div>
            </label>
          ))}
        </div>

        <HubWebAddress
          hub={hub}
          setHub={setHub}
          onValidationUpdate={(message) => updateInputValidation({ subdomain: message })}
        />

        <hr />

        <div className="form-buttons">
          <LinkButton to={`/`} text="Back" />
          <button className="primary" disabled={!submitEnabled}>
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
