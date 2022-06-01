import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Header.css";
import { IconLogOut, IconExternal } from "../common/icons";
import logoBlack from "../../images/logo-black.svg";
import { selectAccount } from "../store/account";

export function Header() {
  const [popoutOpen, setPopoutOpen] = useState(false);
  const account = useSelector(selectAccount);

  useEffect(() => {
    const closePopout = () => setPopoutOpen(false);
    window.addEventListener("click", closePopout);
    return () => window.removeEventListener("click", closePopout);
  }, []);
  const stopClickPropagation = (e) => e.stopPropagation();

  return (
    <div className="header">
      <h1>
        <Link to="/">
          <img alt="Mozilla Hubs logo" src={logoBlack} />
        </Link>
      </h1>

      {account && (
        <div className="account" onClick={stopClickPropagation}>
          <img
            tabIndex="0"
            role="button"
            alt="profile picture"
            className="account-picture"
            src={account.profilePicture}
            onClick={() => setPopoutOpen(!popoutOpen)}
          />

          {popoutOpen && (
            <div className="account-popout">
              <div className="account-details">
                <img alt="profile picture" src={account.profilePicture} />
                <span className="account-email">{account.email}</span>
                {/* TODO Pull domain from some configuration */}
                <a
                  className="account-manage"
                  href="https://accounts.stage.mozaws.net/settings"
                  target="_blank"
                  rel="noreferrer"
                >
                  Manage your Firefox Account
                  <IconExternal />
                </a>
              </div>

              <hr />

              <div>
                <IconLogOut />
                <a href="/logout">Sign Out</a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
