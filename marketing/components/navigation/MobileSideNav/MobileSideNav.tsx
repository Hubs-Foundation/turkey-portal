import { useCallback } from 'react';
import { Button, ButtonCategoriesE, ButtonSizesE } from '@mozilla/lilypad';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import styles from './MobileSideNav.module.scss';

type MobileSideNavPropsT = {
  isOpen: boolean;
  MobileMenuClick: Function;
};

const MobileSideNav = ({
  isOpen = false,
  MobileMenuClick,
}: MobileSideNavPropsT) => {
  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick();
  }, [MobileMenuClick]);

  const handleGetStartedClick = useCallback(() => {
    // TODO bubble up scroll to...
    MobileMenuClick();
  }, [MobileMenuClick]);

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
              <a className={styles.nav_link} href="#">
                Creator Labs
              </a>
            </li>
            <li>
              <a className={styles.nav_link} href="#">
                Hubs Cloud
              </a>
            </li>
            <li>
              <a className={styles.nav_link} href="#">
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
