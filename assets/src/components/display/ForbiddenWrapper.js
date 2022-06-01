import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import { UserNotFound } from "./UserNotFound";
import { selectIsForbidden } from "../store/hubs";

export function ForbiddenWrapper({ children }) {
  const isForbidden = useSelector(selectIsForbidden);
  return <>{isForbidden ? <UserNotFound /> : children}</>;
}

ForbiddenWrapper.propTypes = {
  children: PropTypes.node,
};
