import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { useRouter } from 'next/router';
import styles from './MobileSideNav.module.scss';
import getEnvVariable from 'config';

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
   * Handle See Pricing Click
   */
  const handleGetStartedClick = useCallback(() => {
    // TODO bubble up scroll to...
    MobileMenuClick();
    router.push('/#subscribe');
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
          <div className="flex-justify-end p-20">
            <Button
              label="close mobile navigation"
              category="primary_clear"
              size="large"
              icon="x"
              onClick={handleMobileMenuClick}
              classProp={styles.menu_button}
            />
          </div>

          {/* Logo */}
          <div className="flex-justify-center mb-10">
            <HubsLogo />
          </div>

          {/* LINKS  */}
          <ul className="m-0">
            <li>
              <a className={styles.nav_link} href="/labs">
                Creator Labs
              </a>
            </li>
            <li>
              <a className={styles.nav_link} href="/docs">
                Docs
              </a>
            </li>
            <li>
              <a className={styles.nav_link} href="/spoke">
                Spoke
              </a>
            </li>
            <li>
              <a
                className={styles.nav_link}
                href="https://github.com/mozilla/hubs-cloud/tree/master/community-edition"
                target="_blank"
                rel="noreferrer"
              >
                Community Edition
              </a>
            </li>
            <li>
              <a
                className={styles.nav_link}
                href="/E4e8oLx/hubs-demo-promenade"
                target="_blank"
                rel="noreferrer"
              >
                Explore Hubs
              </a>
            </li>
          </ul>

          {/* ACTIONS  */}
          <div className="p-24">
            <div className="mb-10 flex">
              <Button
                label="See Pricing and subscribe to Hubs"
                classProp="flex-grow-1 "
                text="See Pricing"
                onClick={handleGetStartedClick}
              />
            </div>

            <div className="flex">
              <Button
                label="Go to your hubs dashboard"
                classProp="flex-grow-1 "
                category="primary_outline"
                href={`https://${getEnvVariable('DASH_ROOT_DOMAIN')}/dashboard`}
                text="Go to my Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileSideNav;
