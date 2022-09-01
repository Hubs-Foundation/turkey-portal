import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import styles from './HubsLogo.module.scss';

type HubsLogoPropsT = {
  classProp?: string;
};

const HubsLogo = ({ classProp = '' }: HubsLogoPropsT) => {
  return (
    <div className={`${styles.logo_wrapper} ${classProp}`}>
      <div className={styles.logo}>hubs</div>
      <BlobIcon />
    </div>
  );
};

export default HubsLogo;
