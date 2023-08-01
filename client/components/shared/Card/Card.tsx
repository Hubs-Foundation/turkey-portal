import { ReactNode } from 'react';
import styles from './Card.module.scss';

type CardPropsT = {
  children: ReactNode;
  size?: 'small' | 'large';
  classProp?: string;
};

const Card = ({ children, size = 'small', classProp = '' }: CardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${styles[size]} ${classProp}`}>
      {children}
    </div>
  );
};

export default Card;
