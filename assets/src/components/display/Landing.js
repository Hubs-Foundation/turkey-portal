import React from "react";

import "./Landing.css";
import { LinkButton } from "../common/LinkButton";
import { Avatar } from "../common/Avatar";
import logoWhite from "../../images/logo-white.svg";

export function Landing() {
  const client = location.origin + location.pathname.replace(/\/$/, "");
  // TODO Use the CLUSTER app config value here, assuming the auth server on the dev cluster is functional.
  const loginUrl = `https://auth.myhubs.net/login?idp=fxa&client=${client}`;
  return (
    <div className="landing-container">
      <Avatar />
      <div className="landing">
        <div className="landing-content">
          <img alt="Mozilla Hubs logo" className="logo" src={logoWhite} />
          <p className="hero">Sign in with a Firefox Account to get started</p>
          <p>
            Thank you for taking part in the Hubs closed beta.
            <br />
            Please sign in or register with a Firefox account to access your new Hubs dashboard.
          </p>
          <div>
            <LinkButton href={loginUrl} text="Sign In / Register" />
          </div>
        </div>
        <div className="footer">
          {/* TODO Get the proper links here */}
          <a href="https://github.com/mozilla/hubs/blob/master/PRIVACY.md">Privacy policy</a>
          <a href="https://github.com/mozilla/hubs/blob/master/TERMS.md">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
}
