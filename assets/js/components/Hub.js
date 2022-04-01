import React from "react";
import PropTypes from "prop-types";

import { IconLink } from "./IconLink";

export function Hub(props) {
  return (
    <div className="hub">
      <div className="hub-row">
        <div className="hub-row-group">
          <span className="name">{props.name}</span>
          <span className={`tag ${props.tier}`}>{props.tier}</span>
        </div>

        <div>
          <span>{props.ccu_limit}CCU</span>
          <span>{props.storage_limit_mb}MB</span>
        </div>
      </div>

      <div className="hub-row">
        <div className="hub-row-group">
          {props.status === "ready" ? (
            <a className="domain" href={`//${props.subdomain}.myhubs.net`}>{props.subdomain}.myhubs.net</a>
          ) : (
            <span className="domain">{props.subdomain}.myhubs.net</span>
          )}
          <span className={`tag ${props.status}`}>{props.status}</span>
        </div>

        <IconLink to={`/hubs/${props.hub_id}?fxa_uid=${props.fxa_uid}`} icon="⚙️" />
      </div>
    </div>
  );
}

Hub.propTypes = {
  name: PropTypes.string,
  tier: PropTypes.string,
  ccu_limit: PropTypes.number,
  storage_limit_mb: PropTypes.number,
  status: PropTypes.string,
  subdomain: PropTypes.string,
  hub_id: PropTypes.number,
  fxa_uid: PropTypes.string,
};
