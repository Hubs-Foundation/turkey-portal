import { useCallback } from 'react';
import { Button } from '@mozilla/lilypad-ui';
import React from 'react';
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

  return (
    <div
      className={`${styles.nav_wrapper} ${
        isOpen ? styles.nav_open : styles.nav_closed
      }`}
    >
      <div className={styles.nav_container}>
        <Button
          label="open menu"
          classProp={styles.menu_button}
          icon="arrow-left"
          onClick={handleMobileMenuClick}
        />

        {/* TODO: work with design and product to get the actual navigation design
        this is a place holder.  */}
        <ul>
          <li>
            <a className={styles.nav_link} href="#">
              My Hubs
            </a>
          </li>
          <li>
            <a className={styles.nav_link} href="#">
              Privacy
            </a>
          </li>
          <li>
            <a className={styles.nav_link} href="#">
              Some Link
            </a>
          </li>
          <li>
            <a className={styles.nav_link} href="#">
              Another Placeholder
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileSideNav;
