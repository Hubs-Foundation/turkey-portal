import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./LinkButton.css";

export function LinkButton({ to, href, text }) {
  return href ? (
    <a className="link-button" href={href}>
      {text}
    </a>
  ) : (
    <Link className="link-button" to={to}>
      {text}
    </Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
};
