import { useCallback } from 'react';
import styles from './MainNav.module.scss';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { Button, Icon } from '@mozilla/lilypad-ui';
import { useDesktopDown } from 'hooks/useMediaQuery';
import getEnvVariable from 'config';
import { NavigationT } from 'types';

type MainNavPropsT = {
  navData?: NavigationT;
  mobileMenuClick: () => void;
  classProp?: string;
};

const MainNav = ({
  navData,
  mobileMenuClick,
  classProp = '',
}: MainNavPropsT) => {
  const isDesktopDown = useDesktopDown();

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    mobileMenuClick && mobileMenuClick();
  }, [mobileMenuClick]);

  /**
   * Main Nav JSX
   */
  return (
    <nav className={`${styles.main_nav} ${classProp}`}>
      <div className={styles.banner_gradient}>
        <div className={styles.marquee_container}>
          <div className={styles.marquee}>
            <section className={styles.banner_text}>
              <div className="flex-align-center">
                <div>
                  <Icon name="info" classProp="mr-10 mt-3" />
                </div>
                <p className="body-sm-bold ">
                  Important Notice: Mozilla Hubs will shut down on May 31, 2024.
                  For more information about the shutdown and how you can
                  support Hubs' life beyond Mozilla, please read{' '}
                  <a
                    target="_blank"
                    href="https://hubs.mozilla.com/labs/sunset/"
                    className="primary-link"
                  >
                    this article
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.main_nav_wrapper}>
        <div className={styles.main_nav_container}>
          {/* Main navigation links / logo */}
          <div className={styles.main_nav_contents}>
            {/* Logo */}
            <HubsLogo />

            {/* Links  */}
            {!isDesktopDown && (
              <div className={styles.main_nav_links}>
                <a href="/labs" className={styles.main_nav_link}>
                  Creator Labs
                </a>

                <a href="/docs" className={styles.main_nav_link}>
                  Docs
                </a>

                <a href="/spoke" className={styles.main_nav_link}>
                  Spoke
                </a>

                <a
                  href="https://github.com/mozilla/hubs-cloud/tree/master/community-edition"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.main_nav_link}
                >
                  Community Edition
                </a>

                <a
                  href="/E4e8oLx/hubs-demo-promenade"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.main_nav_link}
                >
                  Explore Hubs
                </a>
              </div>
            )}
          </div>

          {/* Go To Hub Dashboard */}
          <div className="flex-align-center">
            {/* Mobile Menu */}
            {isDesktopDown && (
              <Button
                label="Menu"
                category="primary_clear"
                icon="menu"
                onClick={handleMobileMenuClick}
                classProp={styles.mobile_menu}
              />
            )}

            {!isDesktopDown && (
              <div className={styles.main_nav_actions}>
                <Button
                  label="Go to your hubs dashboard"
                  classProp="mr-10"
                  category="primary_outline"
                  href={`https://${getEnvVariable(
                    'DASH_ROOT_DOMAIN'
                  )}/dashboard`}
                  text="Go to Dashboard"
                />
                <Button
                  label="See Pricing and subscribe to Hubs"
                  category="primary_solid"
                  href="/#subscribe"
                  text="See Pricing"
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
