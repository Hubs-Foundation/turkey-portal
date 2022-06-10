import IconButton from '@Shared/IconButton/IconButton';
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
  const handleMobileMenuClick = () => {
    MobileMenuClick();
  };

  return (
    <div
      className={`${styles.nav_wrapper} ${
        isOpen ? styles.nav_open : styles.nav_closed
      }`}
    >
      <div className={styles.nav_container}>
        <IconButton
          classProp={styles.menu_button}
          icon="arrow-left"
          onClick={handleMobileMenuClick}
          size={30}
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
