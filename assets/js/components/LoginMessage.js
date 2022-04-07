import React from "react";
import { useLocation } from "react-router-dom";

export function LoginMessage() {
  const location = useLocation();
  const returnTo = encodeURIComponent(location.pathname);
  // TODO Replace this with a real login link.
  return <span><a href={`/some_login_link?returnTo=${returnTo}`}>Log in</a> to get started</span>;
}
