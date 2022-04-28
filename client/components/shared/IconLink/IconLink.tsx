import Link from 'next/link'
import styles from './IconLink.module.scss'

type IconLinkPropsT = {
  to:string,
  icon:string
}

const IconLink = ({to,icon}:IconLinkPropsT) => {
  return (
    <div className={styles.icon_link} >
      <Link href={to}>
        {icon}
      </Link>
    </div>
  )
}


export default IconLink


