import { Button } from '@mozilla/lilypad-ui';
import { useState } from 'react';
import styles from './ButtonToggle.module.scss';

export type ButtonToggleOptions<T> = {
  label: string;
  value: T;
};

type ButtonTogglePropsT<T> = {
  options: ButtonToggleOptions<T>[];
  onClick?: (value: T) => void;
  classProp?: string;
};

const ButtonToggle = <T,>({
  options,
  onClick,
  classProp = '',
}: ButtonTogglePropsT<T>) => {
  const [currentValue, setCurrentValue] = useState(options[0].value);

  /**
   * Handle Button Click
   * @param value
   */
  const handleButtonClick = (value: T) => {
    setCurrentValue(value);
    onClick && onClick(value);
  };

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      {options.map(({ value, label }) => (
        <Button
          label={label}
          text={label}
          key={label}
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
