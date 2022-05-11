import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { LinkButton } from "../common/LinkButton";
import { IconDrive, IconUsers } from "../common/icons";
import { formatNumber, formatMegabytes } from "../utils/formatNumber";

export function Hub({ tier, name, status, subdomain, currentCcu, ccuLimit, storageUsageMb, storageLimitMb, hubId }) {
  return (
    <div className="hub">
      <div className="hub-info">
        <span className={`tag ${tier}`}>{tier}</span>
        <span className="name">{name}</span>
      </div>

      <div>
        {status === "ready" ? (
          <a className="domain" href={`//${subdomain}.myhubs.net`}>
            {subdomain}.myhubs.net
          </a>
        ) : (
          <span className="domain">{subdomain}.myhubs.net</span>
        )}
      </div>

      <span className="hub-stats">
        <IconUsers />
        {formatNumber(currentCcu)} / {formatNumber(ccuLimit)}
      </span>
      <span className="hub-stats">
        <IconDrive />
        {formatMegabytes(storageUsageMb)} / {formatMegabytes(storageLimitMb)}
      </span>

      <div className="hub-buttons">
        <LinkButton to={`/hubs/${hubId}`} text="Hub Settings" />
        {/* TODO change hardcoded value for domain*/}
        <LinkButton href={`https://${subdomain}.myhubs.net/admin`} text="Admin Panel" />
      </div>
    </div>
  );
}

Hub.propTypes = {
  name: PropTypes.string,
  tier: PropTypes.string,
  currentCcu: PropTypes.number,
  ccuLimit: PropTypes.number,
  storageUsageMb: PropTypes.number,
  storageLimitMb: PropTypes.number,
  status: PropTypes.string,
  subdomain: PropTypes.string,
  hubId: PropTypes.string,
};
