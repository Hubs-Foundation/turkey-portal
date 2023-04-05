import Image from 'next/image';
import styles from './TileSpotlight.module.scss';
import bubbleTop from '../../../public/bubble-top.png';
import bubbleBottom from '../../../public/bubble-bottom.png';
import { SpotlightTile, TileSpotlightT } from 'types';

interface TileSpotlightPropsI extends TileSpotlightT {
  classProp?: string;
}

/**
 * Spotlight Tile
 */
const Tile = ({ image, imageAlt, title, description }: SpotlightTile) => {
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
          <div className={styles.tile_bar} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
};

const TileSpotlight = ({
  title,
  body,
  tilesCollection,
  classProp = '',
}: TileSpotlightPropsI) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.bubble_top}>
        <Image
          src={bubbleTop}
          alt="bubble background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
        />
      </div>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>

        {/* CARDS  */}
        <div className={styles.tiles}>
          {tilesCollection.items.map(
            ({ image, imageAlt, title, description, ctaTitle, ctaHref }, i) => {
              return (
                <Tile
                  key={i}
                  image={image}
                  imageAlt={imageAlt}
                  title={title}
                  description={description}
                  ctaTitle={ctaTitle}
                  ctaHref={ctaHref}
                />
              );
            }
          )}
        </div>
      </div>
      <div className={styles.bubble_bottom}>
        <Image
          src={bubbleBottom}
          alt="bubble background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
    </section>
  );
};

export default TileSpotlight;
