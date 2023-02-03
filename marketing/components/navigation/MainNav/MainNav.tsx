import { useCallback, useEffect, useState } from 'react';
import styles from './MainNav.module.scss';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { DASH_ROOT_DOMAIN } from 'config';
import { getNavigationLinksEntry } from '../../../services/contentful.service';
import { LinkT } from 'types';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
  const isDesktopDown = useDesktopDown();
  const router = useRouter();
  const [navLinks, setNavLinks] = useState<LinkT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const navigationId = '4FsGf6XPSDTPppGDlyFYm9';
      const links = await getNavigationLinksEntry(navigationId);
      links && setNavLinks(links);
    };

    fetchData();
  }, []);

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
            {!isDesktopDown && (
              <div className={styles.main_nav_links}>
                {Boolean(navLinks) &&
                  navLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      aria-label={link.label}
                      className={styles.main_nav_link}
                    >
                      {link.text}
                    </a>
                  ))}
              </div>
            )}
          </div>

          {/* Go To Hub Dashboard */}
          <div className="flex-align-center">
            {/* Mobile Menu */}
            {isDesktopDown && (
              <Button
                label="Menu"
                category={ButtonCategoriesE.PRIMARY_CLEAR}
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
                  category={ButtonCategoriesE.PRIMARY_OUTLINE}
                  href={`https://${DASH_ROOT_DOMAIN}/dashboard`}
                  text="Go to Dashboard"
                />
                <Button
                  label="Get started and subscribe to Hubs"
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
