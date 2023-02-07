import React, { MouseEventHandler, useEffect, useState } from 'react';
import styles from './CardButton.module.scss';
import { Icon, IconT } from '@mozilla/lilypad-ui';

export type CardButtonPropsT = {
  id?: string;
  title: string;
  description?: string;
  icon: IconT;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  classProp?: string;
};

const CardButton = ({
  id,
  title,
  description,
  icon,
  onClick,
  classProp = '',
}: CardButtonPropsT) => {
  return (
    <button
      className={`
        ${styles.button} 
        ${classProp}
        ${!description && 'flex-align-center'}
      `}
      id={id}
      aria-label={title}
      type="button"
      onClick={onClick}
    >
      {/* Icon */}
      <div className={styles.icon_wrapper}>
        <Icon classProp={styles.icon} size={34} name={icon} />
      </div>

      {/* Attributes  */}
      <div className={styles.attributes_wrapper}>
        <div className={styles.title}>{title}</div>
        {description && <div className={styles.description}>{description}</div>}
      </div>

      {/* Arrow Icon  */}
      <div className={`no-mobile ${styles.icon_wrapper}`}>
        <Icon classProp={styles.icon} size={34} name="arrow-right" />
      </div>
    </button>
  );
};

export default CardButton;
