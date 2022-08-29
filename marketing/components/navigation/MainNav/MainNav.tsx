import { useCallback } from 'react';
import styles from './MainNav.module.scss';
import Link from 'next/link';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import { useTabletDown } from 'hooks/useMediaQuery';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    // we will probably have a mobile slide out menu *place holder*
  }, [MobileMenuClick]);

  const isTabletDown = useTabletDown();

  /**
   * Main Nav JSX
   */
  return (
    <nav className={`${styles.main_nav} ${classProp}`}>
      <div className={styles.banner_gradient} />

      <div className={styles.main_nav_wrapper}>
        <div className={styles.main_nav_container}>
          {/* Main navigation links / logo */}
          <div className={styles.main_nav_contents}>
            {/* Logo */}
            <div className={styles.logo_wrapper}>
              <div className={styles.logo}>hubs</div>
              <BlobIcon />
            </div>

            {/* Links  */}
            {!isTabletDown && (
              <div className={styles.main_nav_links}>
                <a href="#" target="_blank" className={styles.main_nav_link}>
                  Creator Labs
                </a>

                <a href="#" target="_blank" className={styles.main_nav_link}>
                  Hubs Cloud
                </a>

                <a href="#" target="_blank" className={styles.main_nav_link}>
                  Try our demo
                </a>
              </div>
            )}
          </div>

          {/* Go To Hub Dashboard */}
          <div className="flex-align-center">
            {/* Mobile Menu */}
            {isTabletDown && (
              <Button
                category={ButtonCategoriesE.PRIMARY_CLEAR}
                icon="menu"
                onClick={handleMobileMenuClick}
                classProp={styles.mobile_menu}
              />
            )}

            {!isTabletDown && (
              <Button
                classProp={styles.dashboard_button}
                category={ButtonCategoriesE.PRIMARY_SOLID}
                text="Get Started"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
