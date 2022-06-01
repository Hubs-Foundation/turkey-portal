import React from "react";

import "./UserNotFound.css";

export function UserNotFound() {
  return (
    <div className="user-not-found-content">
      <h1>User not found</h1>
      <p>
        <a href="mailto:hubs@mozilla.com?subject=Interested in the Beta Program">Contact Hubs</a> to learn more about
        the Beta program.
      </p>
      <a href="https://hubs.mozilla.com/">Mozilla Hubs Home</a>
    </div>
  );
}
