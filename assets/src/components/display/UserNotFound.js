import React from "react";
import { Link } from "react-router-dom";

import { Layout } from "./Layout";
import "./UserNotFound.css";
import logoBlack from "../../images/logo-black.svg";

export function UserNotFound() {
  return (
    <Layout content={
      <div className="user-not-found-content">
        <Link to="/">
          <img alt="Mozilla Hubs logo" src={logoBlack} />
        </Link>
        <h1>User not found</h1>
        <p><a href="mailto:hubs@mozilla.com?subject=Interested in the Beta Program">Contact Hubs</a> to learn more about the Beta programme.</p>
        <a href="https://hubs.mozilla.com/">Mozilla Hubs Home</a>
      </div>
    } />
  );
}
