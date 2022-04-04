import React from "react";

function redirect() {
  window.location = "http://localhost:4000/login?idp=fxa&client="+window.location.origin+window.location.pathname.slice(0, -1)
}

function getAccount() {
  console.log("fetching account")
  fetch("http://localhost:4000/api/v1/account")
}

export function Login() {
  return (
    <>
    <button type="button" onClick={getAccount}>Get Account (WIP)</button>
    <button type="button" onClick={redirect}>Login</button>
    </>
  );
}