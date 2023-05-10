import Image, { StaticImageData } from 'next/image';
import styles from './SupportLink.module.scss';
import { Icon } from '@mozilla/lilypad-ui';
import Card from '@Shared/Card/Card';

export type SupportLinkPropsT = {
  image: StaticImageData;
  href?: string;
  title: string;
  body: string;
  target?: '_blank' | '_self';
  onClick?: () => void;
  classProp?: string;
};

const SupportLink = ({
  image,
  href,
  title,
  body,
  target = '_blank',
  onClick,
  classProp = '',
}: SupportLinkPropsT) => {
  /**
   * Button Click Event
   */
  const handleButtonClick = () => {
    onClick && onClick();
  };

  const LinkContent = () => (
    <Card classProp={`${styles.wrapper} ${classProp}`}>
      <div className={styles.header}>
        <Image src={image} alt={title} height={40} width={40} />
        <Icon name="external-link" color="currentColor" />
      </div>

      <h3 className="body-md-bold mb-8">{title}</h3>
      <p className="paragraph-sm">{body}</p>
    </Card>
  );

  return href ? (
    <a href={href} className="flex" target={target}>
      <LinkContent />
    </a>
  ) : (
    <button className={styles.button} onClick={handleButtonClick}>
      <LinkContent />
    </button>
  );
};

export default SupportLink;
