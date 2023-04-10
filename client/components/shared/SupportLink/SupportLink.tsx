import Image, { StaticImageData } from 'next/image';
import styles from './SupportLink.module.scss';
import { Icon } from '@mozilla/lilypad-ui';

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
      <section className={`${styles.wrapper} ${classProp}`}>
        <div className={styles.header}>
          <Image src={image} alt={title} height={40} width={40} />
          <Icon name="external-link" color="currentColor" />
        </div>

        <h3 className="body-md-bold mb-8">{title}</h3>
        <p>{body}</p>
      </section>
    </a>
  );
};

export default SupportLink;
