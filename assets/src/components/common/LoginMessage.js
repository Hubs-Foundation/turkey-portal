import React from "react";

export function LoginMessage() {
  const client = location.origin + location.pathname.replace(/\/$/, "");
  return <span><a href={`https://auth.myhubs.net/login?idp=fxa&client=${client}`}>Log in</a> to get started</span>;
}
