import { useCallback } from 'react';
import { Button, ButtonCategoriesE, ButtonSizesE } from '@mozilla/lilypad';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import { useRouter } from 'next/router';
import styles from './MobileSideNav.module.scss';

type MobileSideNavPropsT = {
  isOpen: boolean;
  MobileMenuClick: Function;
};

const MobileSideNav = ({
  isOpen = false,
  MobileMenuClick,
}: MobileSideNavPropsT) => {

  const router = useRouter();

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick();
  }, [MobileMenuClick]);

  /**
   * Handle Get Started Click
   */
  const handleGetStartedClick = useCallback(() => {
    // TODO bubble up scroll to...
    MobileMenuClick();
    router.push('/#subscribe-hook')
  }, [MobileMenuClick, router]);

  return (
    <>
      <div
        className={`${styles.overlay} ${
          isOpen ? styles.overlay_open : styles.overlay_closed
        }`}
      />

      <div
        className={`${styles.nav_wrapper} ${
          isOpen ? styles.nav_open : styles.nav_closed
        }`}
      >
        <div className={styles.banner_gradient} />
        <div className={styles.nav_container}>
          <div className="flex-justify-end padding-20">
            <Button
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              size={ButtonSizesE.LARGE}
              icon="x"
              onClick={handleMobileMenuClick}
              classProp={styles.menu_button}
            />
          </div>

          {/* Logo */}
          <div className="flex-justify-center margin-bottom-10">
            <div className={styles.logo_wrapper}>
              <div className={styles.logo}>hubs</div>
              <BlobIcon />
            </div>
          </div>

          {/* LINKS  */}
          <ul className="margin-0">
            <li>
              <a className={styles.nav_link} target="_blank" rel="noreferrer" href="https://hubs.mozilla.com/labs/">
                Creator Labs
              </a>
            </li>
            <li>
              <a className={styles.nav_link} target="_blank" rel="noreferrer" href="https://hubs.mozilla.com/cloud">
                Hubs Cloud
              </a>
            </li>
            <li>
              {/* TODO get demo url?  */}
              <a className={styles.nav_link} target="_blank" rel="noreferrer" href="#">
                Try our demo
              </a>
            </li>
          </ul>

          {/* ACTIONS  */}
          <div className="padding-24 flex">
            <Button
              classProp="flex-grow-1 "
              text="Get Started"
              onClick={handleGetStartedClick}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSideNav;
