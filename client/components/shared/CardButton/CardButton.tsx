import React, { MouseEventHandler, useEffect, useState } from 'react';
import styles from './CardButton.module.scss';
import { Icon, IconT } from '@mozilla/lilypad'

export type CardButtonPropsT = {
  id?: string;
  title: string;
  description: string;
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
      `}
      id={id}
      aria-label={title}
      type="button"
      onClick={onClick}
    >
      <div className={styles.icon_wrapper}>
        {/* Icon */}
        <Icon classProp={styles.icon} size={34} name={icon}/>
      </div>

      <div className={styles.attributes_wrapper}>
        {/* Attributes  */}
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>

      <div className={styles.icon_wrapper}>
        {/* Arrow Icon  */}
        <Icon classProp={styles.icon} size={34} name="arrow-right"/>
      </div>
    
    </button>
  );
};

export default CardButton;
