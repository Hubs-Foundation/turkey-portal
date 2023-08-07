import Image from 'next/image';
import styles from './TileSpotlight.module.scss';
import snowTop from '../../../public/snow-top.png';
import snowBottom from '../../../public/snow-bottom.png';
import { SpotlightTile, TileSpotlightT } from 'types';
import Swoosh from '@Shared/Swoosh/Swoosh';
import { Button } from '@mozilla/lilypad-ui';
import Bar from '@Shared/Bar/Bar';

interface TileSpotlightPropsI extends TileSpotlightT {
  classProp?: string;
}

/**
 * Spotlight Tile
 */
const Tile = ({
  image,
  imageAlt,
  title,
  description,
  ctaTitle,
  ctaHref,
}: SpotlightTile) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <div className={styles.tile_image}>
          <Image
            src={image.url}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>

        <div className={styles.tile_content}>
          <div className="flex-box">
            <div className={styles.tile_bar} />
            <h3>{title}</h3>
            <p>{description}</p>
          </div>

          {ctaHref && ctaTitle && (
            <div className={styles.tile_cta}>
              <Button text={ctaTitle} href={ctaHref} label={ctaTitle} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const TileSpotlight = ({
  title,
  body,
  background,
  adornment,
  textColor,
  tilesCollection,
  classProp = '',
}: TileSpotlightPropsI) => {
  return (
    <section
      className={`${classProp}${styles['background_' + background]} ${
        adornment === 'none' && 'my-100'
      }`}
    >
      {adornment === 'swoosh' && <Swoosh />}

      <div className={styles['wrapper_' + adornment]}>
        {adornment === 'snow' && (
          <div className={styles.snow_top}>
            <Image
              src={snowTop}
              alt="snow background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
            />
          </div>
        )}

        <section className={styles.container}>
          <section className={`${styles[textColor]} mb-16`}>
            <div className="flex-justify-center">
              <div className={styles.header_container}>
                <div className={styles.bar_wrapper}>
                  <Bar />
                </div>
                <h2 className="heading-xxl mt-4 mb-18">{title}</h2>
              </div>
            </div>
            {body && <p className={styles.body}>{body}</p>}
          </section>

          {/* TILES */}
          <div className={styles.tiles}>
            {tilesCollection.items.map((props, i) => {
              return <Tile key={i} {...props} />;
            })}
          </div>
        </section>
        {adornment === 'snow' && (
          <div className={styles.snow_bottom}>
            <Image
              src={snowBottom}
              alt="snow background"
              layout="fill"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        )}
      </div>

      {adornment === 'swoosh' && <Swoosh location="bottom" />}
    </section>
  );
};

export default TileSpotlight;
