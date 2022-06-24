import React from "react";

import "./Landing.css";
import { AUTH_SERVER } from "../utils/app-config";
import { LinkButton } from "../common/LinkButton";
import { Avatar } from "../common/Avatar";
import logoWhite from "../../images/logo-white.svg";

export function Landing() {
  const client = location.origin + location.pathname.replace(/\/$/, "");
  const loginUrl = `https://${AUTH_SERVER}/login?idp=fxa&client=${client}`;
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
          <a href="https://www.mozilla.org/en-US/privacy/hubs/">Privacy policy</a>
          <a href="https://www.mozilla.org/en-US/about/legal/terms/hubs/">Terms and Conditions</a>
        </div>
      </div>
    </div>
  );
}
