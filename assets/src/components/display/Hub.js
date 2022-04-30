import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { LinkButton } from "../common/LinkButton";
import { IconDrive, IconUsers } from "../common/icons";
import { formatNumber } from "../utils/formatNumber";

export function Hub(props) {
  return (
    <div className="hub">
      <div className="hub-info">
        <span className={`tag ${props.tier}`}>{props.tier}</span>
        <span className="name">{props.name}</span>
      </div>

      <div className="">
        {props.status === "ready" ? (
          <a className="domain" href={`//${props.subdomain}.myhubs.net`}>
            {props.subdomain}.myhubs.net
          </a>
        ) : (
          <span className="domain">{props.subdomain}.myhubs.net</span>
        )}
      </div>

      <span className="hub-stats">
        <IconUsers />
        {formatNumber(props.current_ccu)} / {formatNumber(props.ccu_limit)}
      </span>
      <span className="hub-stats">
        <IconDrive />
        {formatNumber(props.storage_usage_mb / 1024)}GB / {formatNumber(props.storage_limit_mb / 1024)}GB
      </span>

      <div className="hub-buttons">
        <LinkButton to={`/hubs/${props.hub_id}`} text="Hub Settings" />
        <LinkButton href={`https://google.com/`} text="Admin Panel" />
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
