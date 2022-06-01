import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import "./Nav.css";

export function Nav() {
  const isForbidden = useSelector((state) => state.hubEntities.isForbidden);
  const location = useLocation();
  const title = isForbidden ? "" : location.pathname.startsWith("/hubs/") ? "Hub Settings" : "Dashboard";
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
};
