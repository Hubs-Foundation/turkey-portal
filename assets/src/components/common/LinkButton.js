import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import "./LinkButton.css";
import { IconExternal } from "./icons";

export function LinkButton({ to, href, text, className, isExternal }) {
  const externalProps = isExternal
    ? {
        target: "_blank",
        rel: "noreferrer",
      }
    : {};

  return href ? (
    <a className={`link-button ${className || ""}`} href={href} {...externalProps}>
      {text} {isExternal && <IconExternal className="link-button-icon" />}
    </a>
  ) : (
    <Link className={`link-button ${className || ""}`} to={to}>
      {text}
    </Link>
  );
}

LinkButton.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  isExternal: PropTypes.bool,
};
