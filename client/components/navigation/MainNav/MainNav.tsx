import { useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import styles from './MainNav.module.scss';
import { logOut } from 'services/account.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import ExternalLink from '@Shared/ExternalLink/ExternalLink';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import {
  Button,
  Avatar,
  ButtonCategoriesE,
  Icon,
  Dropdown,
  dropdownT,
} from '@mozilla/lilypad';

type MainNavPropsT = {
  classProp?: string;
  MobileMenuClick: Function;
};

const MainNav = ({ classProp = '', MobileMenuClick }: MainNavPropsT) => {
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

  const onManageAccountClick = useCallback(() => {
    // TODO set up variables to get correct FX account link
  },[])

  /**
   * Handle Menu Click
   */
  const handleMobileMenuClick = useCallback(() => {
    MobileMenuClick();
  }, [MobileMenuClick]);

  /**
   * Dropdown Content
   */
  const DropdownContent = (
    <div className={styles.dropdown_wrapper}>
      <div className={styles.account_wrapper}>
        <Avatar
          classProp="margin-top-5"
          src={account.profilePic}
          size={40}
          alt="profile picture"
        />
        <div className={styles.account_details}>
          <div className={styles.account_label}>Signed in as</div>
          <div className={styles.account_email}>{account.email}</div>
        </div>
      </div>

      <hr className="dropdown-hr" />

      {/* Sign Out  */}
      <div className={styles.links}>
        <a
          href="#"
          target="_blank"
          className="dropdown-link"
          onClick={() => {
            onManageAccountClick();
          }}
        >
          {/* TODO update icon asset  */}
          <Icon classProp="margin-right-10" color="currentColor" name="plus-circle" size={24} />
          Manage Your Firefox Account
        </a>

        <a
          href="#"
          target="_blank"
          className="dropdown-link"
          onClick={() => {
            onLogOutClick();
          }}
        >
          {/* TODO update icon asset  */}
          <Icon classProp="margin-right-10" color="currentColor" name="plus-circle" size={24} />
          Sign Out
        </a>
      </div>
    </div>
  );

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
            {/* Mobile Menu */}
            {/* <IconButton
              icon="menu"
              onClick={handleMobileMenuClick}
              size={30}
              classProp={styles.mobile_menu}
            /> */}

            {/* Logo */}
            <div className={styles.logo_wrapper}>
              <div className={styles.logo}>hubs</div>
              <BlobIcon />
            </div>
          </div>

          {/* Account information  */}
          <div className="flex-align-center">
            <Button
              classProp={styles.exit_button}
              category={ButtonCategoriesE.SECONDARY_OUTLINE}
              text="Exit Dashboard"
            />

            <Dropdown
              ref={dropdownRef}
              alignment="right"
              cta={
                <div className={styles.main_nav_account}>
                  {account.profilePic && (
                    <span className="flex-align-center">
                      <Avatar
                        src={account.profilePic}
                        size={50}
                        alt="profile picture"
                      />
                    </span>
                  )}
                </div>
              }
              content={DropdownContent}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
