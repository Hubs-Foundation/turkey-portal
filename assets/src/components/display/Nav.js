import React from "react";
import PropTypes from "prop-types";

import "./Nav.css";
import { Link } from "react-router-dom";
import { IconBackButton } from "../common/icons";

export function Nav({ showBackButton, title }) {
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

Nav.propTypes = {
  title: PropTypes.string,
  showBackButton: PropTypes.bool,
};
