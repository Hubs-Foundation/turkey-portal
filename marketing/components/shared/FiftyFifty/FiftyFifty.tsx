import styles from './FiftyFifty.module.scss';
import Image, { StaticImageData } from 'next/image';
import { useTabletDown } from 'hooks/useMediaQuery';

export enum FiftyFiftyLayoutE {
  LEFT = 'left',
  RIGHT = 'right',
}

type FiftyFiftyPropsT = {
  image: StaticImageData;
  imageMobile: StaticImageData;
  imageAlt?: string;
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
  imageAlt = 'fifty fify image',
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
        <div className={styles.image_wrapper}>
          <div className={styles.image_contianer}>
            <Image
              className={styles.image}
              src={isTabletDown ? imageMobile : image}
              alt={imageAlt}
              layout={isTabletDown ? undefined : 'fill'}
              objectFit={isTabletDown ? undefined : 'cover'}
              objectPosition={isTabletDown ? undefined : 'center'}
              width={isTabletDown ? 500 : undefined}
              height={isTabletDown ? 500 : undefined}
            />
          </div>
        </div>

        {/* Contents  */}
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {accentImage && (
              <div className={styles.accent_image}>
                <Image
                  width={isTabletDown ? 95 : 164}
                  height={isTabletDown ? 92 : 159}
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
