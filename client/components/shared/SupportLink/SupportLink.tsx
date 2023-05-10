import Image, { StaticImageData } from 'next/image';
import styles from './SupportLink.module.scss';
import { Icon } from '@mozilla/lilypad-ui';
import Card from '@Shared/Card/Card';

export type SupportLinkPropsT = {
  image: StaticImageData;
  link: string;
  title: string;
  body: string;
  classProp?: string;
};

const SupportLink = ({
  image,
  link,
  title,
  body,
  classProp = '',
}: SupportLinkPropsT) => {
  return (
    <a href={link} className="flex">
      <Card classProp={`${styles.wrapper} ${classProp}`}>
        <div className={styles.header}>
          <Image src={image} alt={title} height={40} width={40} />
          <Icon name="external-link" color="currentColor" />
        </div>

        <h3 className="body-md-bold mb-8">{title}</h3>
        <p>{body}</p>
      </Card>
    </a>
  );
};

export default SupportLink;
