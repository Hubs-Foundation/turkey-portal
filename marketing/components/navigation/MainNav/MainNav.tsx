import { useCallback } from 'react';
import styles from './MainNav.module.scss';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import { useTabletDown } from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { DASH_ROOT_DOMAIN } from 'config';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
  const isTabletDown = useTabletDown();
  const router = useRouter();

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick && MobileMenuClick();
  }, [MobileMenuClick]);

  const handleGetStartedClick = useCallback(() => {
    router.push('/#subscribe');
  }, [router]);

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
            <HubsLogo />

            {/* Links  */}
            {!isTabletDown && (
              <div className={styles.main_nav_links}>
                <a href="/labs" className={styles.main_nav_link}>
                  Creator Labs
                </a>

                <a href="/cloud" className={styles.main_nav_link}>
                  Hubs Cloud
                </a>

                <a href="/demo" className={styles.main_nav_link}>
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
              <div className={styles.main_nav_actions}>
                <Button
                  classProp="margin-right-10"
                  category={ButtonCategoriesE.PRIMARY_OUTLINE}
                  href={`https://${DASH_ROOT_DOMAIN}`}
                  text="Go to Dashboard"
                />
                <Button
                  category={ButtonCategoriesE.PRIMARY_SOLID}
                  onClick={handleGetStartedClick}
                  text="Get Started"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
