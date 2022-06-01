import React from "react";
import PropTypes from "prop-types";

import "./Spinner.css";
import { IconSpinner } from "../common/icons";

export function Spinner({ isInline }) {
  return (
    <div className={`spinner-container ${isInline && "inline"}`}>
      <IconSpinner className="spinner" />
    </div>
  );
}
Spinner.propTypes = {
  isInline: PropTypes.bool,
};
