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
  contentRight?: ReactNode;
  icon?: ReactNode;
  classProp?: string;
};

const RadioRow = ({
  option,
  currentValue,
  contentRight,
  icon,
  classProp,
}: RadioRowPropsT) => {
  const { label, value, groupName, id } = option;

  return (
    <label htmlFor={id}>
      <div
        className={`${styles.wrapper} ${
          value === currentValue && styles.active
        } ${classProp}`}
      >
        <div className="flex-align-center">
          <RadioButton
            groupValue={currentValue}
            key={id}
            value={value}
            id={id}
            groupName={groupName}
            icon={icon}
          />
          <span className="body-md-semi-bold ml-6">{label}</span>
        </div>

        <div>{contentRight}</div>
      </div>
    </label>
  );
};

export default RadioRow;
