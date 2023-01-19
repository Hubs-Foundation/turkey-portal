import { useMemo } from 'react';
import styles from './ValueProps.module.scss';
import { Icon, IconT } from '@mozilla/lilypad';

type ValuePropsPropsT = {
  values: TilePropsT[];
  classProp?: string;
};

export type TilePropsT = {
  icon: IconT;
  title: string;
  description: string;
  hasBorder?: boolean;
};

/**
 * Value Tile
 */
const Tile = ({ icon, title, description }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <div className={styles.tile_icon}>
          <Icon name={icon} size={64} />
        </div>

        <div className={styles.tile_content}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className={styles.border} />
      </div>
    </section>
  );
};

const ValueProps = ({ values, classProp = '' }: ValuePropsPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.tiles}>
          {values.map(({ icon, title, description }, i) => {
            return (
              <Tile
                key={i}
                icon={icon}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
