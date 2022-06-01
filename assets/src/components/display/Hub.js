import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { LinkButton } from "../common/LinkButton";
import { Spinner } from "../common/Spinner";
import { IconDrive, IconUsers } from "../common/icons";
import { formatNumber, formatMegabytes } from "../utils/formatNumber";
import { READY } from "../utils/hub-constants";

export function Hub({ tier, name, status, subdomain, currentCcu, ccuLimit, storageUsageMb, storageLimitMb, hubId }) {
  const ccu = `${formatNumber(currentCcu)} / ${formatNumber(ccuLimit)}`;
  const storage = `${formatMegabytes(storageUsageMb)} / ${formatMegabytes(storageLimitMb)}`;

  return (
    <div className={`hub ${status}`}>
      <div className="hub-info">
        {tier && <span className={`tag ${tier}`}>{tier}</span>}
        <span className="name">{name}</span>
      </div>

      {status === READY ? (
        <>
          <div>
            <a className="domain" href={`//${subdomain}.myhubs.net`}>
              {subdomain}.myhubs.net
            </a>
          </div>

          <span className="hub-stats">
            <IconUsers /> {ccu}
          </span>
          <span className="hub-stats">
            <IconDrive /> {storage}
          </span>

          <div className="hub-buttons">
            <LinkButton to={`/hubs/${hubId}`} text="Hub Settings" />
            {/* TODO change hardcoded value for domain*/}
            <LinkButton href={`https://${subdomain}.myhubs.net/admin`} text="Admin Panel" />
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="domain">
              <Spinner isInline />
              Building your new hub...
            </span>
          </div>

          <span className="hub-stats">
            <IconUsers /> -
          </span>
          <span className="hub-stats">
            <IconDrive /> -
          </span>
        </>
      )}
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
