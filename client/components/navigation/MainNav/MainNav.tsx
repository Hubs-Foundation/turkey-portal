import { useRef, useCallback } from 'react';
import styles from './MainNav.module.scss';
import { logOut } from 'services/account.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import BlobIcon from '@Logos/BlobIcon/BlobIcon';
import {
  AUTH_SERVER,
  FXA_SERVER,
  DASH_ROOT_DOMAIN,
  MARKETING_PAGE_URL,
} from 'config';

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
  showLoggedOutUi?: boolean;
};

const MainNav = ({
  classProp = '',
  showLoggedOutUi = false,
}: MainNavPropsT) => {
  const account = useSelector(selectAccount);
  const dropdownRef = useRef<dropdownT>(null);

  const onLogOutClick = useCallback(async () => {
    dropdownRef.current?.closeDropdown();
    try {
      await logOut();
    } catch {
      console.error('Error: issue logging out');
    }

    window.location.href = MARKETING_PAGE_URL;
  }, []);

  const onManageAccountClick = useCallback(() => {
    window.open(`https://${FXA_SERVER}/settings`);
  }, []);

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

      {/* Account / Sign Out  */}
      <div className={styles.links}>
        <button
          className="dropdown-link"
          onClick={() => {
            onManageAccountClick();
          }}
        >
          <Icon
            classProp="margin-right-10"
            color="currentColor"
            name="fx-account"
            size={24}
          />
          Manage Your Firefox Account
        </button>

        <button
          aria-label="sign out"
          className="dropdown-link"
          onClick={() => {
            onLogOutClick();
          }}
        >
          {/* TODO update icon asset  */}
          <Icon
            classProp="margin-right-10"
            color="currentColor"
            name="log-out"
            size={24}
          />
          Sign Out
        </button>
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

          {/* Account information */}
          {!showLoggedOutUi && (
            <div className="flex-align-center">
              <Button
                label="edit dashboard"
                classProp={styles.exit_button}
                category={ButtonCategoriesE.SECONDARY_OUTLINE}
                text="Exit Dashboard"
                onClick={onLogOutClick}
              />

              <Dropdown
                ref={dropdownRef}
                alignment="right"
                cta={
                  <div className={styles.main_nav_account}>
                    {account.profilePic && (
                      <span className="flex-align-center">
                        <button className="u-button-wrapper">
                          <Avatar
                            src={account.profilePic}
                            size={50}
                            alt="profile picture"
                          />
                        </button>
                      </span>
                    )}
                  </div>
                }
                content={DropdownContent}
              />
            </div>
          )}

          {/* Login Action  */}
          {showLoggedOutUi && (
            <Button
              label="sign in"
              category={ButtonCategoriesE.SECONDARY_OUTLINE}
              text="Sign In"
              href={`https://${AUTH_SERVER}/login?idp=fxa&client=https://${DASH_ROOT_DOMAIN}`}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
