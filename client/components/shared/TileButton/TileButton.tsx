import { ReactNode } from 'react';
import styles from './TileButton.module.scss';
import { Icon } from '@mozilla/lilypad-ui';

export type TileButtonPropsT = {
  icon: ReactNode;
  color: '--color-brand-1' | '--color-brand-2' | '--color-brand-4';
  link: string;
  title: string;
  classProp?: string;
};

const TileButton = ({
  icon,
  color = '--color-brand-1',
  link,
  title,
  classProp = '',
}: TileButtonPropsT) => {
  return (
    <a href={link} className="flex">
      <section className={`${styles.wrapper} ${classProp}`}>
        <div className={styles.container}>
          <div
            className={styles.icon}
            style={{ backgroundColor: `var(${color})` }}
          >
            {icon}
          </div>
          <Icon name="external-link" color="currentColor" size={16} />
        </div>

        <header>
          <p className={styles.title}>{title}</p>
        </header>
      </section>
    </a>
  );
};

export default TileButton;
