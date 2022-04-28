import styles from './MainNav.module.scss'
import Link from 'next/link'

type MainNavPropsT = {}

const MainNav = ({}:MainNavPropsT) => {
  return (
    <div className={styles.nav_wrapper}>
      <div className={styles.nav_container}>

        <div className={styles.branding_wrapper}>
          TURKEY
        </div>

        <div className={styles.nav_contents}>
          <div>user@mozilla.com</div>
          <Link href="#">Log Out</Link>
        </div>

      </div>
    </div>
  )
}

export default MainNav
