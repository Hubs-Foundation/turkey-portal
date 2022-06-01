import React from "react";
import { useLocation } from "react-router-dom";

import "./Nav.css";
import { Link } from "react-router-dom";
import { IconBackButton } from "../common/icons";
import { useHubs } from "../hooks/hubs";

export function Nav() {
  const { isLoading, isForbidden } = useHubs();
  const location = useLocation();
  const isHubsSettings = location.pathname.startsWith("/hubs/");
  const isAllowed = !isLoading && !isForbidden;
  const title = isAllowed ? (isHubsSettings ? "Hub Settings" : "Dashboard") : "";
  const showBackButton = isAllowed && isHubsSettings;
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
