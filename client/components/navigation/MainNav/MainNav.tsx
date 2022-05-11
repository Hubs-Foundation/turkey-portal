import styles from './MainNav.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { selectAccount } from '../../../store/accountSlice'
import { useSelector } from 'react-redux'
import Dropdown from '../../shared/Dropdown/Dropdown'
import ExternalLink from '../../shared/ExternalLink/ExternalLink'

type MainNavPropsT = {
  classProp: string
}

const MainNav = ({ classProp = '' }: MainNavPropsT) => {

  const account = useSelector(selectAccount)

  const old = (
    <div className="account-popout">
      <div className="account-details">
        <Image alt="profile picture" width="30" height="30" src={account.profilePic} />
        <span className="account-email">local-user@turkey.local</span>
        <a className="account-manage" href="https://accounts.stage.mozaws.net/settings" target="_blank" rel="noreferrer">Manage your Firefox Account
          {/* <img className="icon" src="/assets/external-RGDL6E4I.svg"> */}
        </a>
      </div>
      <hr />
      <div>
        {/* <img className="icon" src="/assets/log-out-ONPRGT7M.svg"> */}
        <a href="/logout">Sign Out</a>
      </div>
    </div>
  )

  const DropdownContent = (
    <div className="padding-5">
      <div className={styles.account_details_wrapper}>
        <Image alt="profile picture" width="30" height="30" src={account.profilePic} />
        <div className={styles.account_details}>
          <div className={styles.account_details_title}> {account.email}</div>
          <ExternalLink
            classProp={styles.account_manage_link}
            icon="external-link"
            target='_blank'
            href={'#'}>
            Manage your Firefox Account
          </ExternalLink>
        </div>
      </div>
    </div>
  )


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
          alignment='right'
          cta={(
            <div className={styles.main_nav_account}>
              {account.profilePic && (
                <Image alt="profile picture" width="50" height="50" src={account.profilePic} />
              )}
            </div>)}
          content={DropdownContent}
        />

      </div>
    </div>
  )
}

export default MainNav
