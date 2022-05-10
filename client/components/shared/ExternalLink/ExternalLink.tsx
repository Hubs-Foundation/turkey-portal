import { ReactNode, HTMLAttributeAnchorTarget } from 'react'
import styles from './ExternalLink.module.scss'
import { IconT } from '../../../types/General'
import Icon from '../Icon/Icon'

type ExternalLinkProps = {
	href: string
	classProp?: string,
	children: ReactNode,
	icon?: IconT,
	target?: HTMLAttributeAnchorTarget
}

const ExternalLink = ({
	href,
	classProp = '',
	children,
	icon,
	target = '_blank',
}: ExternalLinkProps) => {

	return (
		<a href={href} target={target} className={`${classProp} ${styles.link}`}>
			{children}
			{icon && <Icon name={icon} color="currentColor" size={16} />}
		</a>
	)
}

export default ExternalLink