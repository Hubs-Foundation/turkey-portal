import { useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './MainNav.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { logOut } from 'services/account.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import Dropdown, { dropdownT } from '@Shared/Dropdown/Dropdown';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import Button from '@Shared/Button/Button';

type MainNavPropsT = {
  classProp?: string;
};

const MainNav = ({ classProp = '' }: MainNavPropsT) => {
  const account = useSelector(selectAccount);
  const dropdownRef = useRef<dropdownT>(null);
  const router = useRouter();

  const onLogOutClick = useCallback(async () => {
    dropdownRef.current?.closeDropdown();
    await logOut();
    router.push({
      pathname: '/login',
    });
  }, [router]);

  /**
   * Dropdown Content
   */
  const DropdownContent = (
    <>
      {/* Go To Firefox Account  */}
      <div className={`padding-10 ${styles.account_details_wrapper}`}>
        <Image
          alt="profile picture"
          width="30"
          height="30"
          src={account.profilePic}
        />
        <div className={styles.account_details}>
          <div className={styles.account_details_title}> {account.email}</div>
          <ExternalLink
            classProp={styles.account_manage_link}
            icon="external-link"
            target="_blank"
            href={'#'}
            onClick={() => {
              dropdownRef.current?.closeDropdown();
            }}
          >
            Manage your Firefox Account
          </ExternalLink>
        </div>
      </div>

      <hr className="dropdown-hr" />

      {/* Sign Out  */}
      <div className={`padding-10 ${styles.account_details_wrapper}`}>
        <Button icon="log-out" text="Sign Out" onClick={onLogOutClick} />
      </div>
    </>
  );

  /**
   * Main Nav JSX
   */
  return (
    <div className={`${styles.main_nav_wrapper} ${classProp}`}>
      <div className={styles.main_nav_container}>
        {/* Main navigation links / logo */}
        <div className={styles.main_nav_contents}>
          {/* Logo */}
          <Image width="86" height="58" src="/hubs_black.svg" alt="hubs logo" />
          {/* Links  */}
          <div className={styles.main_nav_links}>
            <div className={styles.main_nav_link}>
              <Link href="#">My Hubs</Link>
            </div>
          </div>
        </div>

        {/* Account information  */}
        <Dropdown
          ref={dropdownRef}
          alignment="right"
          cta={
            <div className={styles.main_nav_account}>
              {account.profilePic && (
                <Image
                  alt="profile picture"
                  width="50"
                  height="50"
                  src={account.profilePic}
                />
              )}
            </div>
          }
          content={DropdownContent}
        />
      </div>
    </div>
  );
};

export default MainNav;
