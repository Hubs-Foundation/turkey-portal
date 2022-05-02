import React from "react";

import "./Landing.css";
import { LinkButton } from "../common/LinkButton";
import { Avatar } from "../common/Avatar";

export function Landing() {
  const client = location.origin + location.pathname.replace(/\/$/, "");
  const loginUrl = `https://auth.myhubs.net/login?idp=fxa&client=${client}`;
  return (
    <div className="landing-container">
      <Avatar />
      <div className="landing">
        <div>
          <h1>Turkey</h1>
          <p className="hero">Sign in with a Firefox account to get started</p>
          <div className="sign-in-mobile">
            <LinkButton
              className="primary"
              href={loginUrl}
              text="Sign In"
            />
          </div>
          <p>
            Thank you for taking part in the Hubs closed beta. Please sign in or register with a Firefox account to
            access your new Hubs dashboard.
          </p>
        </div>
        <div className="sign-in-desktop">
          <LinkButton
            className="primary"
            href={loginUrl}
            text="Sign In"
          />
        </div>
      </div>
    </div>
  );
}
