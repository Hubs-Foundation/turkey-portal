import React from "react";

function redirect() {
  window.location =
    "http://auth.myhubs.net/login?idp=fxa&client=" +
    window.location.origin +
    window.location.pathname.slice(0, -1);
}

function getAccount() {
  fetch(window.location.origin + "/api/v1/account");
}

export function Login() {
  return (
    <>
      <button type="button" onClick={getAccount}>
        Get Account (WIP)
      </button>
      <button type="button" onClick={redirect}>
        Login
      </button>
    </>
  );
}
