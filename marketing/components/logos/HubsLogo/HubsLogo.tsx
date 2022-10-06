import Image from 'next/image';
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './HubsLogo.module.scss';
import logoDark from '../../../public/hubs_logo_dark.svg';
import logoLight from '../../../public/hubs_logo_light.svg';

export enum LogoCategoryE {
  DARK = 'dark',
  LIGHT = 'light',
}

type HubsLogoPropsT = {
  category?: LogoCategoryE;
  href?: string;
  classProp?: string;
};

const HubsLogo = ({
  category = LogoCategoryE.LIGHT,
  href = '/',
  classProp = '',
}: HubsLogoPropsT) => {
  const router = useRouter();
  const handleButtonClick = useCallback(() => {
    router.push(href);
  }, [href, router]);

  return (
    <button
      className={`${styles.logo_wrapper} ${classProp}`}
      onClick={handleButtonClick}
    >
      <Image
        layout="fixed"
        width={140}
        height={50}
        src={category === LogoCategoryE.DARK ? logoDark : logoLight}
        alt="Hubs Logo"
      />
    </button>
  );
};

export default HubsLogo;
