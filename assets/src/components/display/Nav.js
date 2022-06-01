import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import "./Nav.css";
import { Link } from "react-router-dom";
import { IconBackButton } from "../common/icons";

export function Nav() {
  const isForbidden = useSelector((state) => state.hubEntities.isForbidden);
  const location = useLocation();
  const isHubsSettings = location.pathname.startsWith("/hubs/");
  const title = isForbidden ? "" : isHubsSettings ? "Hub Settings" : "Dashboard";
  const showBackButton = isHubsSettings;
  return (
    <div className="nav">
      {showBackButton && (
        <Link to={"/"}>
          <IconBackButton />
        </Link>
      )}
      <h2>{title}</h2>
    </div>
  );
}
