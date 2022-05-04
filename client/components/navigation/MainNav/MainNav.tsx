import { CSSProperties } from 'react'
import styles from './MainNav.module.scss'
import Link from 'next/link'

type MainNavPropsT = {
  classProp: string
}

const MainNav = ({classProp }: MainNavPropsT) => {
  return (
    <div className={`${styles.main_nav_wrapper} ${classProp}`}>
      <div className={styles.main_nav_container}>

        <div className={styles.branding_wrapper}>
          TURKEY
        </div>

        <div className={styles.main_nav_contents}>
          <div>user@mozilla.com</div>
          <Link href="#">Log Out</Link>
        </div>

      </div>
    </div>
  )
}

export default MainNav
