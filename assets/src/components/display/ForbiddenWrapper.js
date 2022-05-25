import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UserNotFound } from "./UserNotFound";

export function ForbiddenWrapper({ children }) {
  const isForbidden = useSelector((state) => state.hubEntities.isForbidden);
  return <>{isForbidden ? <UserNotFound /> : children}</>;
}
