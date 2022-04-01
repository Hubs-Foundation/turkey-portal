import React from "react";
import PropTypes from "prop-types";

export function FormChoice({ name, value, choices, disabled, onChange }) {
  return (
    <div>
      <span className="formchoice-name">{name}</span>
      <div className="formchoice-choices">
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
            {choice}
          </label>
        ))}
      </div>
    </div>
  );
}

FormChoice.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  choices: PropTypes.array,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
