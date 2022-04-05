import React from "react";
import PropTypes from "prop-types";

import { formatNumber } from "./utils";

export function FormChoice({ name, title, value, choices, allDisabled, onChange }) {
  return (
    <div>
      <span className="formchoice-name">{title || name}</span>
      <div className="formchoice-choices">
        {choices.map((choice) => {
          const choiceDisabled = choice.disabled || allDisabled;
          return <label key={choice.value} className={choiceDisabled ? "formchoice-disabled" : ""}>
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={!choiceDisabled && value.toString() === choice.value.toString()}
              disabled={choiceDisabled}
              onChange={(e) => onChange(e.target.value)}
            />
            {formatNumber(choice.value)}
          </label>
        })}
      </div>
    </div>
  );
}

FormChoice.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  choices: PropTypes.arrayOf(PropTypes.exact({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    disabled: PropTypes.bool,
  })),
  allDisabled: PropTypes.bool,
  onChange: PropTypes.func,
};
