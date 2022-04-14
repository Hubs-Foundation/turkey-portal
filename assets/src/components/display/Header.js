import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

function concealEmail(str) {
  if (!str.includes("@")) return str;
  return str.replace(/^(\w)\w*(\w)@/, "$1...$2@");
}

export function Header({ account }) {
  return (
    <div className="header">
      <h1>
        <a href="/">Turkey</a>
      </h1>
      {account && (
        <div className="account">
          <span title={account.email}>{concealEmail(account.displayName)}</span>
          <img className="account-picture" src={account.profilePicture} />
          {account.isLoggedIn && <a href="/logout">Log Out</a>}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  account: PropTypes.object,
};
