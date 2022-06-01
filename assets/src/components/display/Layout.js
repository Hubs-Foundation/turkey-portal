import React from "react";
import PropTypes from "prop-types";

import "./Layout.css";
import { Header } from "./Header";
import { Nav } from "./Nav";

export function Layout({ children }) {
  return (
    <>
      <div className="top-bar">
        <Header />
      </div>
      <div className="nav-bar">
        <Nav />
      </div>
      <div className="content">{children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};
