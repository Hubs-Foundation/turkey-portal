import { ReactNode } from 'react';
import styles from './Card.module.scss';

type CardPropsT = {
  children: ReactNode;
  classProp?: string;
};

const Card = ({ children, classProp = '' }: CardPropsT) => {
  return <div className={`${styles.wrapper} ${classProp}`}>{children}</div>;
};

export default Card;
