import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './IconLink.module.scss'

const IconLink = ({to,icon}) => {
  return (
    <Link className={styles.icon_link} href={to}>
      {icon}
    </Link>
  )
}

IconLink.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
}

export default IconLink


