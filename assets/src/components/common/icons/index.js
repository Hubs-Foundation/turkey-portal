import React from "react";
import PropTypes from "prop-types";

import drive from "./drive.svg";
import users from "./users.svg";
import clock from "./clock.svg";
import spinner from "./spinner.svg";
import logOut from "./log-out.svg";
import external from "./external.svg";

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

export function IconClock() {
  return <img className="icon" src={clock} />;
}

export function IconSpinner({ className }) {
  return <img className={`icon ${className}`} src={spinner} />;
}
IconSpinner.propTypes = { className: PropTypes.string };

export function IconLogOut() {
  return <img className="icon" src={logOut} />;
}

export function IconExternal() {
  return <img className="icon" src={external} />;
}
