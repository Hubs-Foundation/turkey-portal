import React from "react";
import PropTypes from "prop-types";

import { IconLink } from "./IconLink";
import { formatNumber } from "./utils";

export function Hub(props) {
  return (
    <div className="hub">
      <div>
        <span className="name">{props.name}</span>
        <span className={`tag ${props.tier}`}>{props.tier}</span>
      </div>

      <div>
        <span>{formatNumber(props.current_ccu)}/{formatNumber(props.ccu_limit)} CCU</span>
        <span>{formatNumber(props.storage_usage_mb)}/{formatNumber(props.storage_limit_mb)} MB</span>
      </div>

      <div>
        {props.status === "ready" ? (
          <a href={`//${props.subdomain}.myhubs.net`}>{props.subdomain}.myhubs.net</a>
        ) : (
          <span>{props.subdomain}.myhubs.net</span>
        )}

        <span className={`tag ${props.status}`}>{props.status}</span>
      </div>

      <div className="settings-link-container">
        <IconLink to={`/hubs/${props.hub_id}?fxa_uid=${props.fxa_uid}`} icon="⚙️" />
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
  hub_id: PropTypes.number,
  fxa_uid: PropTypes.string,
};
