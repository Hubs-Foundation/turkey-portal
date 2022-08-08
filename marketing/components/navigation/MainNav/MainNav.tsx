import { useCallback } from 'react';
import styles from './MainNav.module.scss';
import Link from 'next/link';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';

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
            {/* Mobile Menu */}
            {/* <IconButton
              icon="menu"
              onClick={handleMobileMenuClick}
              size={30}
              classProp={styles.mobile_menu}
            /> */}

            {/* Logo */}
            <div className={styles.logo_wrapper}>
              <div className={styles.logo}>hubs</div>
              <BlobIcon />
            </div>

            {/* Links  */}
            <div className={styles.main_nav_links}>
          
              <div className={styles.main_nav_link}>
                <a href="#" target="_blank">Hubs Cloud</a>
              </div>
              <div className={styles.main_nav_link}>
                <a href="#" target="_blank">Creator Labs</a>
              </div>
              <div className={styles.main_nav_link}>
                <a href="#" target="_blank">Try our demo</a>
              </div>

            </div>
          </div>

          {/* Go To Hub Dashboard */}
          <div className="flex-align-center">
            <Button
              classProp={styles.dashboard_button}
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text="My Hub Dashboard"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
