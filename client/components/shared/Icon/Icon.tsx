import { IconT } from '../../../types/General'
import styles from './Icon.module.scss'

type IconProps = {
  name: IconT,
  color?: string,
  size?: number
}

const Icon = ({
  name,
  color = '#000000',
  size = 20
}: IconProps) => {

  return (
      <svg
        className={styles.icon}
        width={size}
        height={size}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <use href={`/feather-sprite.svg#${name}`} />
      </svg>
  )
}

export default Icon