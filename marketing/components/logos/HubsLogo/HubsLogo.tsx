import Image from 'next/image';
import styles from './HubsLogo.module.scss';
import logoDark from '../../../public/hubs_logo_dark.svg';
import logoLight from '../../../public/hubs_logo_light.svg';

export enum LogoCategoryE {
  DARK = 'dark',
  LIGHT = 'light',
}

type HubsLogoPropsT = {
  category?: LogoCategoryE;
  classProp?: string;
};

const HubsLogo = ({
  category = LogoCategoryE.LIGHT,
  classProp = '',
}: HubsLogoPropsT) => {
  return (
    <div className={`${styles.logo_wrapper} ${classProp}`}>
      <Image
        src={category === LogoCategoryE.DARK ? logoDark : logoLight}
        alt="Hubs Logo"
      />
    </div>
  );
};

export default HubsLogo;
