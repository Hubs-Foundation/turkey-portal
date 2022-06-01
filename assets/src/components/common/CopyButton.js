import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import "./CopyButton.css";
import { IconCopy } from "./icons";

export function CopyButton({ text }) {
  const [showCopied, setShowCopied] = useState(false);
  const timeoutRef = useRef();

  const copyText = () => {
    if (showCopied) return;

    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      timeoutRef.current = setTimeout(() => setShowCopied(false), 1000);
    });
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <button className="copy-button" onClick={copyText}>
      {showCopied ? "Copied!" : <IconCopy />}
    </button>
  );
}
CopyButton.propTypes = { text: PropTypes.string };
