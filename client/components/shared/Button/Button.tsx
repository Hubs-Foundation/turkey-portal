import React, { MouseEventHandler, useEffect, useState } from 'react';
import { ButtonT, ButtonCategoriesE, ButtonSizesE } from 'types/Form';
import { IconT } from 'types/General';
import styles from './Button.module.scss';
import Icon from '@Shared/Icon/Icon';

export type ButtonPropsT = {
  active?: boolean;
  id?: string;
  text?: string;
  type?: ButtonT;
  category?: ButtonCategoriesE;
  size?: ButtonSizesE;
  disabled?: boolean;
  icon?: IconT;
  iconPlacedRight?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  classProp?: string;
};

const Button = ({
  active,
  id,
  text,
  type = 'button',
  category = ButtonCategoriesE.PRIMARY_SOLID,
  size = ButtonSizesE.MEDIUM,
  disabled,
  icon,
  onClick,
  iconPlacedRight = false,
  classProp = '',
}: ButtonPropsT) => {
  const [categoryClass, setCategoryClass] = useState<string>();
  const [categoryActiveClass, setCategoryActiveClass] = useState<string>();

  useEffect(() => {
    setButtonClass(category);
  }, [category]);

  /**
   * Get Button Category Class
   * @param category : string
   */
  const setButtonClass = (category: string) => {
    const {
      PRIMARY_SOLID,
      PRIMARY_OUTLINE,
      PRIMARY_CLEAR,
      SECONDARY_SOLID,
      SECONDARY_OUTLINE,
      SECONDARY_CLEAR,
    } = ButtonCategoriesE;

    switch (category) {
      // PRIMARY
      case PRIMARY_SOLID:
        setCategoryClass(styles.button_primary_solid);
        setCategoryActiveClass(styles.button_primary_solid_active);
        break;
      case PRIMARY_OUTLINE:
        setCategoryClass(styles.button_primary_outline);
        setCategoryActiveClass(styles.button_primary_outline_active);
        break;
      case PRIMARY_CLEAR:
        setCategoryClass(styles.button_primary_clear);
        setCategoryActiveClass(styles.button_primary_clear_active);
        break;

      // SECONDARY
      case SECONDARY_SOLID:
        setCategoryClass(styles.button_secondary_solid);
        setCategoryActiveClass(styles.button_secondary_solid_active);
        break;
      case SECONDARY_OUTLINE:
        setCategoryClass(styles.button_secondary_outline);
        setCategoryActiveClass(styles.button_secondary_outline_active);
        break;
      case SECONDARY_CLEAR:
        setCategoryClass(styles.button_secondary_clear);
        setCategoryActiveClass(styles.button_secondary_clear_active);
        break;
    }
  };

  return (
    <button
      className={`${categoryClass} ${styles[size]} ${
        !text && styles[size + '_round']
      } ${classProp} ${active ? categoryActiveClass : ''}`}
      id={id}
      aria-label={text}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Left Icon  */}
      {icon && !iconPlacedRight ? (
        <Icon
          name={icon}
          color="currentColor"
          size={24}
          classProp={text ? 'margin-right-10' : ''}
        />
      ) : (
        ''
      )}
      {/* Button Text  */}
      {text}
      {/* Right Icon  */}
      {icon && iconPlacedRight ? (
        <Icon
          name={icon}
          color="currentColor"
          size={24}
          classProp={text ? 'margin-left-10' : ''}
        />
      ) : (
        ''
      )}
    </button>
  );
};

export default Button;
