import { useMemo } from 'react';
import styles from './ValueProps.module.scss';
import { Icon, IconT } from '@mozilla/lilypad';

type ValuePropsPropsT = {
  classProp?: string;
};

type TilePropsT = {
  icon: IconT;
  title: string;
  description: string;
  hasBorder?: boolean;
};

/**
 * Value Tile
 */
const Tile = ({ icon, title, description, hasBorder = false }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <div className={styles.tile_icon}>
          <Icon name={icon} size={37} />
        </div>

        <div className={styles.tile_content}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        {hasBorder && <div className={styles.border} />}
      </div>
    </section>
  );
};

const ValueProps = ({ classProp = '' }: ValuePropsPropsT) => {
  /**
   * Value Data
   */
  const values = useMemo(() => {
    const data: TilePropsT[] = [
      {
        icon: 'shield',
        title: 'Private by design',
        description:
          'Your Hubs spaces are private by design and discoverable only to people you share the link with.',
      },
      {
        icon: 'cross-device',
        title: 'Works across devices',
        description:
          'Guests can join from most devices with a modern browser - desktop computers, mobile devices, and VR headsets. No downloads required.',
      },
      {
        icon: 'code',
        title: 'Open Source  ',
        description:
          'Hubs is built in the open, check out our source code here',
      },
    ];
    return data;
  }, []);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Privacy remains our focus</h2>
        </div>

        <div className={styles.tiles}>
          {values.map(({ icon, title, description }, i) => {
            return (
              <Tile
                key={i}
                icon={icon}
                title={title}
                description={description}
                hasBorder={i < 2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
