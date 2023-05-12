import { ReactNode } from 'react';
import { RadioButton } from '@mozilla/lilypad-ui';
import styles from './RadioRow.module.scss';

type RadioRowOptionT = {
  label: string;
  value: string;
  groupName: string;
  id: string;
};

type RadioRowPropsT = {
  option: RadioRowOptionT;
  currentValue: string;
  additional?: ReactNode;
  icon?: ReactNode;
  classProp?: string;
};
const RadioRow = ({
  option,
  currentValue,
  additional,
  icon,
  classProp,
}: RadioRowPropsT) => {
  return (
    <label htmlFor={option.id}>
      <div
        className={`${styles.wrapper} ${
          option.value === currentValue && styles.active
        } ${classProp}`}
      >
        <div className="flex-align-center">
          <RadioButton
            groupValue={currentValue}
            key={option.id}
            value={option.value}
            id={option.id}
            groupName={option.groupName}
            icon={icon}
          />
          <div className="body-md-semi-bold ml-6">{option.label}</div>
        </div>

        <div className={styles.additoinal}>{additional}</div>
      </div>
    </label>
  );
};

export default RadioRow;
