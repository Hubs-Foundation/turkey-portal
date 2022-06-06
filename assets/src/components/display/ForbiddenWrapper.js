import React from "react";
import PropTypes from "prop-types";

import { useAccount } from "../hooks/account";
import { UserNotFound } from "./UserNotFound";
import { Spinner } from "../common/Spinner";

export function ForbiddenWrapper({ children }) {
  const { isLoading, account } = useAccount();
  return <>{isLoading ? <Spinner /> : account.isForbidden ? <UserNotFound /> : children}</>;
}

ForbiddenWrapper.propTypes = {
  children: PropTypes.node,
};
