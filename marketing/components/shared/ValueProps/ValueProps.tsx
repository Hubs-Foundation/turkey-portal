import { ReactNode } from 'react';
import styles from './ValueProps.module.scss';
import { Icon, HubIcon } from '@mozilla/lilypad-ui';

type ValuePropsPropsT = {
  classProp?: string;
};

export type TilePropsT = {
  icon: ReactNode;
  title: string;
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
        {icon && <div className={styles.tile_icon}>{icon}</div>}

        <div className={styles.tile_content}>
          <div className="flex-justify-center">
            <h3>{title}</h3>
          </div>
          {description && <p>{description}</p>}
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
            icon={<HubIcon name="cross-device" size={64} />}
            title="Universal Accessibility"
            description="Connect from your phone, computer, or headset. No software download needed."
          />

          <Tile
            icon={<Icon name="code" size={64} />}
            title="Full Customization"
            description='Choose from pre-made environments and avatars, or create your own."'
          />

          <Tile
            icon={<Icon name="shield" size={64} />}
            title="Privacy-First Promise"
            description="Your personal data is never collected and you control access to your worlds."
          />
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
