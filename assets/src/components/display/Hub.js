import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { IconLink } from "../common/IconLink";
import { formatNumber } from "../utils/formatNumber";

export function Hub(props) {
  return (
    <div className="hub">
      <div className="hub-row">
        <div className="hub-row-group">
          <span className="name">{props.name}</span>
          <span className={`tag ${props.tier}`}>{props.tier}</span>
        </div>

        <div>
          <span className="hub-stats">
            {formatNumber(props.current_ccu)}/{formatNumber(props.ccu_limit)} CCU
          </span>
          <br />
          <span className="hub-stats">
            {formatNumber(props.storage_usage_mb)}/{formatNumber(props.storage_limit_mb)} MB
          </span>
        </div>
      </div>

      <div className="hub-row">
        <div className="hub-row-group">
          {props.status === "ready" ? (
            <a className="domain" href={`//${props.subdomain}.dev.myhubs.net`}>
              {props.subdomain}.dev.myhubs.net
            </a>
          ) : (
            <span className="domain">{props.subdomain}.dev.myhubs.net</span>
          )}
          <span className={`tag ${props.status}`}>{props.status}</span>
        </div>

        <IconLink to={`/hubs/${props.hub_id}`} icon="⚙️" />
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
