import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import styles from './HubsLogo.module.scss';

export enum LogoCategoryE {
  DARK = 'dark',
  LIGHT = 'light',
}

type HubsLogoPropsT = {
  category?: LogoCategoryE;
  classProp?: string;
};

const HubsLogo = ({ category = LogoCategoryE.LIGHT, classProp = '' }: HubsLogoPropsT) => {
  return (
    <div className={`${styles.logo_wrapper} ${classProp}`}>
      <div className={styles[`logo_${category}`]}>hubs</div>
      <BlobIcon />
    </div>
  );
};

export default HubsLogo;
