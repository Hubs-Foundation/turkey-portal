import React from 'react';
import styles from './SideNav.module.scss';

const SideNav = () => {
  return (
    <div className={styles.nav_wrapper}>
      <div className={styles.nav_container}>
        {/* TODO: work with design and product to get actualy navigation
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

export default SideNav;
