import React from "react";
import PropTypes from "prop-types";

import { format } from "./utils";

export function FormChoice({ name, title, value, choices, disabled, onChange }) {
  return (
    <div>
      <span className="formchoice-name">{title || name}</span>
      {choices.map((choice) => (
        <label key={choice}>
          <input
            type="radio"
            name={name}
            value={choice}
            checked={value.toString() === choice.toString()}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
          />
          {format(choice)}
        </label>
      ))}
    </div>
  );
}

FormChoice.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  choices: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
