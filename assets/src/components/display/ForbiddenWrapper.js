import React from "react";
import PropTypes from "prop-types";

import { useHubs } from "../hooks/hubs";
import { UserNotFound } from "./UserNotFound";
import { Spinner } from "../common/Spinner";

export function ForbiddenWrapper({ children }) {
  const { isLoading, isForbidden } = useHubs();
  return <>{isLoading ? <Spinner /> : isForbidden ? <UserNotFound /> : children}</>;
}

ForbiddenWrapper.propTypes = {
  children: PropTypes.node,
};
