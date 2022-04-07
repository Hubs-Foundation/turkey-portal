import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./IconLink";

export function IconLink(props) {
  return (
    <Link className="icon-link" to={props.to}>
      {props.icon}
    </Link>
  );
}

IconLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
};
