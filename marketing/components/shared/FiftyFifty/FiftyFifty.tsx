import { ReactNode } from 'react';
import styles from './FiftyFifty.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useDesktopDown } from 'hooks/useMediaQuery';

/**
  FiftyFifty component can be image left / content right or vice versa
  use layout to alter image content placement.
**/
export enum FiftyFiftyLayoutE {
  LEFT = 'left',
  RIGHT = 'right',
}

type FiftyFiftyPropsT = {
  image: StaticImageData;
  imageMobile: StaticImageData;
  imageAlt: string;
  accentImage?: StaticImageData;
  accentImageAlt?: string;
  title?: string;
  subTitle?: string;
  body?: string;
  children?: ReactNode;
  layout?: FiftyFiftyLayoutE;
  classProp?: string;
};

const FiftyFifty = ({
  image,
  imageMobile,
  imageAlt,
  accentImage,
  accentImageAlt = 'Accent Image',
  title,
  subTitle,
  body,
  children,
  layout = FiftyFiftyLayoutE.LEFT,
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
              src={isDesktopDown ? imageMobile : image}
              alt={imageAlt}
              layout={isDesktopDown ? 'responsive' : 'fill'}
              objectFit={isDesktopDown ? undefined : 'cover'}
              objectPosition={isDesktopDown ? undefined : 'center'}
              width={isDesktopDown ? 800 : undefined}
              height={isDesktopDown ? 700 : undefined}
              placeholder="blur"
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
                  src={accentImage}
                  alt={accentImageAlt}
                />
              </div>
            )}
            {subTitle ? (
              <h4 className="u-heading-sm">{subTitle}</h4>
            ) : (
              <div className={styles.bar_wrapper}>
                <div className={styles.bar} />
              </div>
            )}
            {title && <h3 className="u-heading-xxl mt-4 mb-18">{title}</h3>}
            {body && <p className="u-body-md">{body}</p>}
            {children && <div className="u-body-md">{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
