import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";

import "./HubForm.css";
import { CLUSTER_DOMAIN } from "../utils/app-config";
import { LinkButton } from "../common/LinkButton";
import { Spinner } from "../common/Spinner";
import { IconDrive, IconUsers, IconValid, IconInvalid } from "../common/icons";
import { formatMegabytes } from "../utils/formatNumber";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HubNickname({ hub, setHub, onValidityUpdate }) {
  const [validity, setValidity] = useState({ isValidating: false, isValid: true, message: "" });

  function validate(name) {
    const trimmedName = name.trim();

    let newValidationMessage = "";
    if (trimmedName.length === 0) {
      newValidationMessage = "Hub nickname is required";
    } else if (trimmedName.length >= 24) {
      newValidationMessage = "Hub nickname too long (24 characters max)";
    }

    const newValidity = { isValidating: false, isValid: newValidationMessage === "", message: newValidationMessage };
    setValidity(newValidity);
    onValidityUpdate(newValidity);
  }

  return (
    <div>
      <span className="form-section-title">Hub Nickname</span>
      {validity.isValid ? (
        <span className="form-section-subtitle">For use within the dashboard area only</span>
      ) : (
        <span className="form-section-subtitle invalid">{validity.message}</span>
      )}
      <input
        type="text"
        value={hub.name}
        className={validity.isValid ? "" : "invalid"}
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
  onValidityUpdate: PropTypes.func,
};

function HubWebAddress({ hub, setHub, onValidityUpdate }) {
  const [validity, setValidity] = useState({ isValidating: false, isValid: true, message: "" });

  function updateAndEmitValidity(validityUpdate) {
    const newValidity = { ...validity, ...validityUpdate };
    setValidity(newValidity);
    onValidityUpdate(newValidity);
  }

  const validate = useMemo(() => {
    const debounceWaitMs = 200;
    return debounce(
      async function (subdomain) {
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
            updateAndEmitValidity({ isValidating: false, isValid: true, message: "" });
          } else {
            updateAndEmitValidity({ isValidating: false, isValid: false, message: "Web address unavailable" });
          }
        } else {
          updateAndEmitValidity({ isValidating: false, isValid: false, message: clientValidationMessage });
        }
      },
      debounceWaitMs,
      { leading: true, trailing: true }
    );
  }, [hub.hubId]);

  return (
    <div className="web-address">
      <div className="web-address-header">
        <span className="form-section-title">Web Address (URL)</span>
        {validity.isValid ? (
          <span className="form-section-subtitle">
            Supports letters (a to z), digits (0 to 9), and hyphens&nbsp;(-)
          </span>
        ) : (
          <span className="form-section-subtitle invalid">{validity.message}</span>
        )}
      </div>
      <div className="web-address-input">
        <input
          type="text"
          className={validity.isValid ? "" : "invalid"}
          value={hub.subdomain}
          onChange={(e) => {
            setHub({ ...hub, subdomain: e.target.value });

            updateAndEmitValidity({ isValidating: true });
            validate(e.target.value);
          }}
        />
        {validity.isValidating ? <Spinner isInline={true} /> : validity.isValid ? <IconValid /> : <IconInvalid />}
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
  onValidityUpdate: PropTypes.func,
};

export function HubForm({ hub, setHub, isSubmitting, onSubmit }) {
  const [inputValidities, setInputValidities] = useState({});

  const tierChoices = [
    { tier: "free", disabled: true, ccuLimit: 5, storageLimitMb: 250 },
    { tier: "mvp", disabled: false, ccuLimit: null, storageLimitMb: null },
  ];

  const toastConfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  };

  const updateInputValidation = (updatedValidity) => {
    setInputValidities((currentValidities) => ({ ...currentValidities, ...updatedValidity }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(hub).then((resp) => {
      const errorMessage = "There was an error updating your hub";
      const successMessage = "Hub has been updated";

      resp.error ? toast.error(errorMessage, toastConfig) : toast.success(successMessage, toastConfig);
    });
  };

  const inputValidityValues = Object.values(inputValidities);
  const everyInputIsValid = inputValidityValues.every((inputValidity) => inputValidity.isValid);
  const noInputsAreValidating = inputValidityValues.every((inputValidity) => !inputValidity.isValidating);
  const submitEnabled = !isSubmitting && noInputsAreValidating && everyInputIsValid;

  return (
    <div className="hub-form-container">
      <form className="hub-form" onSubmit={onFormSubmit}>
        <HubNickname
          hub={hub}
          setHub={setHub}
          onValidityUpdate={(validity) => updateInputValidation({ nickname: validity })}
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
          onValidityUpdate={(validity) => updateInputValidation({ subdomain: validity })}
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
