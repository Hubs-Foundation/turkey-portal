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
      <section className={styles.icon}>
        <Image src={image} alt={title} height={40} width={40} />
      </section>

      <section className="flex-grow-1">
        <div className="flex-justify-between">
          <h3 className="body-md-bold mb-8">{title}</h3>
          <Icon name="external-link" color="currentColor" />
        </div>
        <p className="paragraph-sm">{body}</p>
      </section>
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
