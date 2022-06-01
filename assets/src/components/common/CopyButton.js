import React, { useState } from "react";
import PropTypes from "prop-types";

import "./CopyButton.css";
import { IconCopy } from "./icons";

export function CopyButton({ text }) {
  const [showCopied, setShowCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 1000);
    });
  };

  return (
    <button className="copy-button" onClick={copyText}>
      {showCopied ? "Copied!" : <IconCopy />}
    </button>
  );
}
CopyButton.propTypes = { text: PropTypes.string };
