import { Button } from '@mozilla/lilypad-ui';
import { useState } from 'react';
import styles from './ButtonToggle.module.scss';

export type ButtonToggleOptionsT = {
  label: string;
  value: string | number;
};

type ButtonTogglePropsT = {
  options: ButtonToggleOptionsT[];
  onClick?: (value: string | number) => void;
  classProp?: string;
};

const ButtonToggle = ({
  options,
  onClick,
  classProp = '',
}: ButtonTogglePropsT) => {
  const [currentValue, setCurrentValue] = useState(options[0].value);

  /**
   * Handle Button Click
   * @param value
   */
  const handleButtonClick = (value: string | number) => {
    setCurrentValue(value);
    onClick && onClick(value);
  };

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      {options.map(({ value, label }, i) => (
        <Button
          label={label}
          text={label}
          key={i}
          onClick={() => {
            handleButtonClick(value);
          }}
          category={value === currentValue ? 'primary_solid' : 'primary_clear'}
        />
      ))}
    </div>
  );
};

export default ButtonToggle;
