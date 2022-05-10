import styles from './MainNav.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { selectAccount } from '../../../store/accountSlice'
import { useSelector } from 'react-redux'
import Dropdown from '../../shared/Dropdown/Dropdown'

type MainNavPropsT = {
  classProp: string
}

const MainNav = ({ classProp = '' }: MainNavPropsT) => {

  const account = useSelector(selectAccount)

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
          content={(<div>some account stuff here</div>)}
        />

      </div>
    </div>
  )
}

export default MainNav
