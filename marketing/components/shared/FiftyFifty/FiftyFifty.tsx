import { ReactNode } from 'react';
import styles from './FiftyFifty.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { ImageT } from 'types/Contentful';
/**
  FiftyFifty component can be image left / content right or vice versa
  use layout to alter image content placement.
**/
export enum FiftyFiftyLayoutE {
  LEFT = 'left',
  RIGHT = 'right',
}

export type FiftyFiftyT = {
  image: ImageT;
  imageMobile: ImageT;
  imageAlt: string;
  accentImage?: ImageT;
  accentImageAlt?: string;
  title?: string;
  subTitle?: string;
  body?: Document;
  layout?: FiftyFiftyLayoutE;
};

type FiftyFiftyPropsT = {
  image: StaticImageData | string;
  imageMobile: StaticImageData | string;
  imageAlt: string;
  accentImage?: StaticImageData | string;
  accentImageAlt?: string;
  title?: string;
  subTitle?: string;
  body?: Document;
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
              <h4>{subTitle}</h4>
            ) : (
              <div className={styles.bar_wrapper}>
                <div className={styles.bar} />
              </div>
            )}
            {title && <h3>{title}</h3>}
            {body && <div>{documentToReactComponents(body)}</div>}
            {children && <div>{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
