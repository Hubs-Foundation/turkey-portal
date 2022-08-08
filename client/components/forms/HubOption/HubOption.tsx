import styles from './HubOption.module.scss';
import { FormEventHandler } from 'react';
import Badge from '@Shared/Badge/Badge';
import Icon from '@Shared/Icon/Icon';
import { BadgeCategoriesE } from 'types/General'

type HubOptionPropsT = {
  value: number | string;
  users: number;
  size: string;
  checked: boolean;
  isDisabled?: boolean;
  id: string;
  label: string;
  labelCategory: BadgeCategoriesE;
  groupName: string;
  onChange?: FormEventHandler<HTMLDivElement>;
  classProp?: string;
};

const HubOption = ({
  label,
  labelCategory,
  value,
  users,
  size,
  checked = false,
  isDisabled = false,
  id,
  groupName,
  onChange,
  classProp = '',
}: HubOptionPropsT) => {
  return (
    <label
      className={`${styles.button_wrapper} ${classProp} ${
        checked ? styles.button_wrapper_active : ''
      }`}
      htmlFor={id}
    >
      <div className={styles.button_input}>
        <input
          id={id}
          type="radio"
          name={groupName}
          value={value}
          checked={checked}
          disabled={isDisabled}
          onChange={onChange}
        />
        <Badge
          classProp="margin-left-10"
          category={labelCategory}
          name={label}
        />
      </div>

      {/* Users  */}
      <div className={styles.attribute_wrapper}>
        <Icon name="users" size={18} />
        <span className="margin-left-5">{users}</span>
      </div>

      {/* Size */}
      <div className={styles.attribute_wrapper}>
        <Icon name="database" size={18} />
        <span className="margin-left-5">{size}</span>
      </div>
    </label>
  );
};

export default HubOption;
