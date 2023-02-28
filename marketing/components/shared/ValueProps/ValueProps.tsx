import { ReactNode } from 'react';
import styles from './ValueProps.module.scss';
import { Icon, IconT } from '@mozilla/lilypad-ui';

type ValuePropsPropsT = {
  classProp?: string;
};

export type TilePropsT = {
  icon?: IconT;
  title?: string;
  description?: string;
  children?: ReactNode;
};

/**
 * Value Tile
 */
const Tile = ({ icon, title, description, children }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        {icon && (
          <div className={styles.tile_icon}>
            <Icon name={icon} size={64} />
          </div>
        )}

        <div className={styles.tile_content}>
          <h3>{title}</h3>
          <p>{description}</p>
          {children && <div className="body-md">{children}</div>}
        </div>
        <div className={styles.border} />
      </div>
    </section>
  );
};

const ValueProps = ({ classProp = '' }: ValuePropsPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.tiles}>
          <Tile
            icon="shield"
            title="Private by design"
            description="You control access to your Hubs, so worlds are only discoverable to people you share the link with."
          />

          <Tile
            icon="cross-device"
            title="Works across devices"
            description="Guests can join from any device with a modern browser — no downloads required."
          />

          <Tile icon="code" title="Open Source">
            <p>
              Hubs is built in the open — you can check out the source code{' '}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/mozilla/hubs"
                className="primary-link"
              >
                here
              </a>
              .
            </p>
          </Tile>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
