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
    <>
      {/* Go To Firefox Account  */}
      <div className={`padding-10 ${styles.account_details_wrapper}`}>
        <Avatar src={account.profilePic} size={30} alt="profile picture" />
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
      <div className={`padding-10`}>
        <a
          href="#"
          target="_blank"
          className="dropdown-link"
          onClick={() => {
            onLogOutClick();
          }}
        >
          <Icon name="chevron-down" size={30} />
          Sign Out of Hubs
        </a>
      </div>
    </>
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
                      <Icon name="chevron-down" color="#ffffff" size={30} />
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
