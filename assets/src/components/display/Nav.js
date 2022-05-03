import React from "react";
import PropTypes from "prop-types";

import "./Nav.css";

export function Nav({ title }) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
}

Nav.propTypes = {
  title: PropTypes.string,
};
