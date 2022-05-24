import React from "react";
import PropTypes from "prop-types";

import "./Layout.css";
import { Header } from "./Header";
import { Nav } from "./Nav";

export function Layout({ title, children }) {
  return (
    <>
      <div className="top-bar">
        <Header />
      </div>
      <div className="nav-bar">
        <Nav title={title} />
      </div>
      <div className="content">{children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
