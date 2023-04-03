import { ReactNode } from 'react';
import styles from './FiftyFifty.module.scss';
import Image from 'next/image';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { FiftyfiftyT } from 'types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

/**
  FiftyFifty component can be image left / content right or vice versa
  use layout to alter image content placement.
**/

interface FiftyFiftyPropsI extends FiftyfiftyT {
  children?: ReactNode;
  classProp?: string;
}

const FiftyFifty = ({
  desktopImage,
  mobileImage,
  imageAlt,
  accentImage,
  accentImageAlt = 'Accent Image',
  title,
  subtitle,
  richText,
  children,
  layout = 'left',
  classProp = '',
}: FiftyFiftyPropsI) => {
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
            {subtitle ? (
              <h4 className="heading-sm">{subtitle}</h4>
            ) : (
              <div className={styles.bar_wrapper}>
                <div className={styles.bar} />
              </div>
            )}
            {title && <h3 className="heading-xxl mt-4 mb-18">{title}</h3>}
            {richText && (
              <div className={styles.body_copy}>
                {documentToReactComponents(richText.json)}
              </div>
            )}
            {children && <div className={styles.body_copy}>{children}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
