import React from "react";

import "./Spinner.css";
import { IconSpinner } from "../common/icons";

export function Spinner() {
  return (
    <div className="spinner-container">
      <IconSpinner className="spinner" />
    </div>
  );
}
