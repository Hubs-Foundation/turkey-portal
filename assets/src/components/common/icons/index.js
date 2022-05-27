import React from "react";
import PropTypes from "prop-types";

import drive from "./drive.svg";
import users from "./users.svg";
import clock from "./clock.svg";
import spinner from "./spinner.svg";
import logOut from "./log-out.svg";
import external from "./external.svg";
import backButton from "./back-button.svg";

import "./Icon.css";

export function IconDrive() {
  return <img alt="storage" className="icon" src={drive} />;
}

export function IconUsers() {
  return <img alt="users" className="icon" src={users} />;
}

export function IconClock() {
  return <img alt="clock icon" className="icon" src={clock} />;
}

export function IconSpinner({ className }) {
  return <img alt="loading" className={`icon ${className}`} src={spinner} />;
}
IconSpinner.propTypes = { className: PropTypes.string };

export function IconLogOut() {
  return <img alt="sign out" className="icon" src={logOut} />;
}

export function IconExternal() {
  return <img alt="external link" className="icon" src={external} />;
}

export function IconBackButton() {
  return <img alt="back" className="icon" src={backButton} />;
}
