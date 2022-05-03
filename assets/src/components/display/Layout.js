import React from "react";
import PropTypes from "prop-types";

import "./Layout.css";

export function Layout({ top, nav, content }) {
  return (
    <>
      <div className="top-bar">{top}</div>
      <div className="nav-bar">{nav}</div>
      <div className="content">{content}</div>
    </>
  );
}

Layout.propTypes = {
  top: PropTypes.node,
  nav: PropTypes.node,
  content: PropTypes.node,
};
