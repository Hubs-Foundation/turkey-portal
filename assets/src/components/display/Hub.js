import React from "react";
import PropTypes from "prop-types";

import "./Hub.css";
import { LinkButton } from "../common/LinkButton";
import { CopyButton } from "../common/CopyButton";
import { Spinner } from "../common/Spinner";
import { IconDrive, IconUsers, IconExternal } from "../common/icons";
import { CLUSTER_DOMAIN } from "../utils/app-config";
import { formatNumber, formatMegabytes } from "../utils/formatNumber";
import { STATUS_READY, STATUS_CREATING, STATUS_UPDATING } from "../utils/hub-constants";

export function Hub({ tier, name, status, subdomain, currentCcu, currentStorageMb, hubId }) {
  const ccu = `${formatNumber(currentCcu)}`;
  const storage = `${formatMegabytes(currentStorageMb)}`;
  const domain = `${subdomain}.${CLUSTER_DOMAIN}`;
  const hubUrl = `https://${domain}`;

  return (
    <div className={`hub ${status}`}>
      <div className="hub-info">
        {tier && <span className={`tag ${tier}`}>{tier}</span>}
        <span className="name">{name}</span>
      </div>

      {status === STATUS_READY ? (
        <>
          <div>
            <a className="domain" href={hubUrl} target="_blank" rel="noreferrer">
              {domain} <IconExternal className="domain-icon" />
            </a>
            <CopyButton text={hubUrl} />
          </div>

          <span className="hub-stats">
            <IconUsers /> {ccu}
          </span>
          <span className="hub-stats">
            <IconDrive /> {storage}
          </span>

          <div className="hub-buttons">
            <LinkButton to={`/hubs/${hubId}`} text="Hub Settings" />
            <LinkButton href={`${hubUrl}/admin`} text="Admin Panel" isExternal />
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="domain">
              <Spinner isInline />
              {status === STATUS_CREATING ? "Building your new hub..." : ""}
              {status === STATUS_UPDATING ? "Updating your hub..." : ""}
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
  currentStorageMb: PropTypes.number,
  status: PropTypes.string,
  subdomain: PropTypes.string,
  hubId: PropTypes.string,
};
