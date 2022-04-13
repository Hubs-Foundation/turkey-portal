import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

export function Header({ account }) {
  return (
    <div className="header">
      <h1>
        <a href="/">Turkey</a>
      </h1>
      {account && (
        <div className="account">
          <span>{account.displayName}</span>
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
