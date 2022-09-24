import styles from './FiftyFifty.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useTabletDown } from 'hooks/useMediaQuery';

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
  layout = FiftyFiftyLayoutE.LEFT,
  classProp = '',
}: FiftyFiftyPropsT) => {
  const isTabletDown = useTabletDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={`${styles.container} ${styles['container_' + layout]}`}>
        {/* Image  */}
        <div className={styles.image_wrapper}>
          <div className={styles.image_container}>
            <Image
              className={styles.image}
              src={isTabletDown ? imageMobile : image}
              alt={imageAlt}
              layout={isTabletDown ? 'responsive' : 'fill'}
              objectFit={isTabletDown ? undefined : 'cover'}
              objectPosition={isTabletDown ? undefined : 'center'}
              width={isTabletDown ? 800 : undefined}
              height={isTabletDown ? 700 : undefined}
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
                  width={isTabletDown ? 95 : 164}
                  height={isTabletDown ? 92 : 159}
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
            {body && <p>{body}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
