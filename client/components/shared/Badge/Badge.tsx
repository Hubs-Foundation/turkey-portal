import PropTypes from 'prop-types'
import styles from './Badge.module.scss'

const propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['primary', 'secondary']),
  classProp: PropTypes.string
}

type BadgePropsT = PropTypes.InferProps<typeof propTypes>

const Badge = ({ name, category = 'primary', classProp = '' }: BadgePropsT) => {
  return (
    <span className={`${(category === 'primary') ? styles.badge_primary : styles.badge_secondary} ${classProp}`}>
      {name}
    </span>
  )
}

Badge.propTypes = propTypes

export default Badge
