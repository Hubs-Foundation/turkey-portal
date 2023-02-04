import { ReactNode } from 'react';
import styles from './FiftyFifty.module.scss';
import Image from 'next/image';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { ImageT } from 'types';

/**
  FiftyFifty component can be image left / content right or vice versa
  use layout to alter image content placement.
**/

type FiftyFiftyPropsT = {
  desktopImage: ImageT;
  mobileImage: ImageT;
  imageAlt: string;
  accentImage?: ImageT | null;
  accentImageAlt?: string;
  title?: string;
  subTitle?: string;
  body?: string;
  children?: ReactNode;
  layout?: 'left' | 'right';
  classProp?: string;
};

const FiftyFifty = ({
  desktopImage,
  mobileImage,
  imageAlt,
  accentImage,
  accentImageAlt = 'Accent Image',
  title,
  subTitle,
  body,
  children,
  layout = 'left',
  classProp = '',
}: FiftyFiftyPropsT) => {
  const isDesktopDown = useDesktopDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={`${styles.container} ${styles['container_' + layout]}`}>
        {/* Image  */}
        <div className={styles.image_wrapper}>
          <div className={styles.image_container}>
            <Image
              className={styles.image}
              src={isDesktopDown ? mobileImage.url : desktopImage.url}
              alt={imageAlt}
              layout={isDesktopDown ? 'responsive' : 'fill'}
              objectFit={isDesktopDown ? undefined : 'cover'}
              objectPosition={isDesktopDown ? undefined : 'center'}
              width={isDesktopDown ? 800 : undefined}
              height={isDesktopDown ? 700 : undefined}
            />
          </div>
        </div>

        {/* Contents  */}
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {/* Note: Accent image is a small image absolutely positioned 
            on the top right of the content that is optional depending on design. */}
            {accentImage && (
              <div className={styles.accent_image}>
                <Image
                  width={isDesktopDown ? 95 : 164}
                  height={isDesktopDown ? 92 : 159}
                  layout="fixed"
                  src={accentImage.url}
                  alt={accentImageAlt}
                />
              </div>
            )}
            {subTitle ? (
              <h4 className="heading-sm">{subTitle}</h4>
            ) : (
              <div className={styles.bar_wrapper}>
                <div className={styles.bar} />
              </div>
            )}
            {title && <h3 className="heading-xxl mt-4 mb-18">{title}</h3>}
            {body && <p className="body-md">{body}</p>}
            {children && <div className="body-md">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
