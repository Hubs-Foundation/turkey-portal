import { ReactNode, HTMLAttributeAnchorTarget } from 'react';
import styles from './ExternalLink.module.scss';
import { IconT } from 'types/General';
import Icon from '@Shared/Icon/Icon';

type ExternalLinkProps = {
  href: string;
  classProp?: string;
  children?: ReactNode;
  icon?: IconT;
  target?: HTMLAttributeAnchorTarget;
  onClick?: Function;
};

const ExternalLink = ({
  href,
  classProp = '',
  children,
  icon,
  target = '_blank',
  onClick,
}: ExternalLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      className={`${classProp} ${styles.link}`}
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      {children}
      {icon && <Icon name={icon} color="currentColor" size={16} />}
    </a>
  );
};

export default ExternalLink;
