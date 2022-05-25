import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { UserNotFound } from "./UserNotFound";

export function ForbiddenWrapper({ children }) {
  const isForbidden = useSelector((state) => state.hubEntities.isForbidden);
  return <>{isForbidden ? <UserNotFound /> : children}</>;
}

ForbiddenWrapper.propTypes = {
  children: PropTypes.node,
};
