import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { LinkButton } from "../common/LinkButton";
import { IconDrive, IconUsers } from "../common/icons";
import { formatNumber, formatMegabytes } from "../utils/formatNumber";

export function Hub({
  tier,
  name,
  status,
  subdomain,
  current_ccu,
  ccu_limit,
  storage_usage_mb,
  storage_limit_mb,
  hub_id,
}) {
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
        {formatNumber(current_ccu)} / {formatNumber(ccu_limit)}
      </span>
      <span className="hub-stats">
        <IconDrive />
        {formatMegabytes(storage_usage_mb)}/ {formatMegabytes(storage_limit_mb)}
      </span>

      <div className="hub-buttons">
        <LinkButton to={`/hubs/${hub_id}`} text="Hub Settings" />
        {/* TODO change hardcoded value for domain*/}
        <LinkButton href={`https://${subdomain}.myhubs.net/admin`} text="Admin Panel" />
      </div>
    </div>
  );
}

Hub.propTypes = {
  name: PropTypes.string,
  tier: PropTypes.string,
  current_ccu: PropTypes.number,
  ccu_limit: PropTypes.number,
  storage_usage_mb: PropTypes.number,
  storage_limit_mb: PropTypes.number,
  status: PropTypes.string,
  subdomain: PropTypes.string,
  hub_id: PropTypes.string,
};
