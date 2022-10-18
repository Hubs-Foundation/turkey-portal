import { useCallback, useEffect, useState } from 'react';
import styles from './MainNav.module.scss';
import HubsLogo from '@Logos/HubsLogo/HubsLogo';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { useRouter } from 'next/router';
import { DASH_ROOT_DOMAIN, AUTH_SERVER } from 'config';
import { createClient } from 'contentful';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

type LinkFieldT = {
  href: string;
  label: string;
  text: string;
};

type LinkT = {
  fields: LinkFieldT;
};

type NavigationT = {
  links: LinkT[];
  name: string;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
  const isDesktopDown = useDesktopDown();
  const router = useRouter();
  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY as string,
  });
  const [navLinks, setNavLinks] = useState<LinkT[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await client.getEntry<NavigationT>(
        '4FsGf6XPSDTPppGDlyFYm9'
      );
      const fields = response.fields.links as LinkT[];
      setNavLinks(fields);
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
                  navLinks.map(({ fields }, i) => (
                    <a
                      key={i}
                      href={fields.href}
                      aria-label={fields.label}
                      className={styles.main_nav_link}
                    >
                      {fields.text}
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
                  classProp="margin-right-10"
                  category={ButtonCategoriesE.PRIMARY_OUTLINE}
                  href={`https://${AUTH_SERVER}/login?idp=fxa&client=https://${DASH_ROOT_DOMAIN}`}
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
