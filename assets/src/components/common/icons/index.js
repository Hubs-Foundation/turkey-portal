import React from "react";
import PropTypes from "prop-types";

import drive from "./drive.svg";
import users from "./users.svg";

import "./Icon.css";

export function Icon({ src }) {
  return <img className="icon" src={src} />;
}
Icon.propTypes = {
  src: PropTypes.string.isRequired,
};

export function IconDrive() {
  return <img className="icon" src={drive} />;
}

export function IconUsers() {
  return <img className="icon" src={users} />;
}
