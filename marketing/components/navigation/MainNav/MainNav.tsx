import { useCallback, useEffect } from 'react';
import styles from './MainNav.module.scss';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { DASH_ROOT_DOMAIN, ENV } from 'config';
import { getNavigationLinksEntry } from '../../../services/contentful.service';
import { LinkT } from 'types';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
  const isDesktopDown = useDesktopDown();
  const router = useRouter();

  /**
   * TODO: there is commented out code in this file to prepare for the CMS - main
   * nav comoponent is in a wrapper compnent that gets it's data via client side.
   * we need to update to nextjs13 and have serverside components and also
   * the new layout architecture to do this appropriatly. Leaving code in here
   * since it will be mostly the same when we update to nextjs 13 shortly.
   */
  // const [navLinks, setNavLinks] = useState<LinkT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const navigationId = '4FsGf6XPSDTPppGDlyFYm9';
      const links = await getNavigationLinksEntry(navigationId);
      // links && setNavLinks(links);
      console.log('links', links);
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
                {/* {Boolean(navLinks) &&
                  navLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.href}
                      aria-label={link.label}
                      className={styles.main_nav_link}
                    >
                      {link.text}
                    </a>
                  ))} */}

                <a href="/labs" className={styles.main_nav_link}>
                  Creator Labs
                </a>

                <a href="/cloud" className={styles.main_nav_link}>
                  Hubs Cloud
                </a>

                <a href="/demo" className={styles.main_nav_link}>
                  Try our demo
                </a>

                <a href="/demo" className={styles.main_nav_link}>
                  <ul>
                    <li>Test</li>

                    <li>env:{process.env.ENV}</li>
                    <li>env:{ENV}</li>
                  </ul>
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
