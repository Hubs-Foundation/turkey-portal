import { useRef, useCallback } from 'react';
import styles from './MainNav.module.scss';
import { logOut } from 'services/account.service';
import { selectAccount } from 'store/accountSlice';
import { useSelector } from 'react-redux';
import BlobIcon from '@Shared/logos/BlobIcon/BlobIcon';
import {
  AUTH_SERVER,
  FXA_SERVER,
  DASH_ROOT_DOMAIN,
  MARKETING_PAGE_URL,
} from 'config';

import {
  Button,
  Avatar,
  Icon,
  Dropdown,
  dropdownT,
  HubIcon,
} from '@mozilla/lilypad-ui';

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
    <div className="dropdown_wrapper">
      <div className={styles.account_wrapper}>
        <Avatar
          classProp="mt-5"
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
          className="dropdown-link mb-24"
          onClick={() => {
            onManageAccountClick();
          }}
        >
          Manage Your Account
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
            classProp="mr-10"
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
      <div className={styles.banner_gradient}>
        <div className={styles.marquee_container}>
          <div className={styles.marquee}>
            <section className={styles.banner_text}>
              <div className="flex-align-center">
                <div>
                  <Icon name="info" classProp="mr-10 mt-3" />
                </div>
                <p className="body-sm-bold ">
                  Important Notice: Mozilla Hubs will shut down on May 31, 2024.
                  For more information about the shutdown and how you can
                  support Hubs&apos; life beyond Mozilla, please read{' '}
                  <a
                    target="_blank"
                    href="https://hubs.mozilla.com/labs/sunset/"
                    className="primary-link"
                    rel="noreferrer"
                  >
                    this article
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className={styles.main_nav_wrapper}>
        <div className={styles.main_nav_container}>
          {/* Main navigation links / logo */}
          <div className={styles.main_nav_contents}>
            {/* Mobile Menu */}
            {/* <Icon
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
                category="secondary_outline"
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
                        <button className="button-wrapper">
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
              category="secondary_outline"
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
