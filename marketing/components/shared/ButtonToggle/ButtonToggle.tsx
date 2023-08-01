import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useState } from 'react';
import styles from './ButtonToggle.module.scss';

export type ButtonToggleOptionsT = {
  label: string;
  value: any;
};

type ButtonTogglePropsT = {
  options: ButtonToggleOptionsT[];
  onClick?: (value: any) => void;
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
  const handleButtonClick = (value: any) => {
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
          category={
            value === currentValue
              ? ButtonCategoriesE.PRIMARY_SOLID
              : ButtonCategoriesE.PRIMARY_CLEAR
          }
        />
      ))}
    </div>
  );
};

export default ButtonToggle;
