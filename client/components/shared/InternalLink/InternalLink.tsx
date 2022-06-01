import { ReactNode } from 'react'
import styles from './InternalLink.module.scss'
import { IconT } from 'types/General'
import Link from 'next/link'
import Icon from '@Icon'

type InternalLinkProps = {
  href: string
  classProp?: string,
  children?: ReactNode,
  icon?: IconT,
  onClick: Function
}

const InternalLink = ({
  href,
  classProp = '',
  children,
  icon,
  onClick
}: InternalLinkProps) => {

  return (
    <span className={`${classProp} ${styles.link}`}>
      <Link href={href}>
        <a className='flex-align-center' onClick={()=>{onClick()}}> 
          {icon && <Icon name={icon} color="currentColor" size={16} />}
          {children}
        </a>
      </Link>
    </span>
  )
}

export default InternalLink