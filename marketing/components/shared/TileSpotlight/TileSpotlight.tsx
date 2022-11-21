import Image, { StaticImageData } from 'next/image';
import styles from './TileSpotlight.module.scss';
import bubbleTop from '../../../public/bubble-top.png';
import bubbleBottom from '../../../public/bubble-bottom.png';

type TileSpotlightPropsT = {
  title?: string;
  body?: string;
  tiles: TilePropsT[];
  classProp?: string;
};

export type TilePropsT = {
  image: StaticImageData;
  imageAlt?: string;
  title: string;
  description: string;
};

/**
 * Spotlight Tile
 */
const Tile = ({ image, imageAlt, title, description }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <div className={styles.tile_image}>
          <Image
            src={image}
            alt={imageAlt}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            placeholder="blur"
          />
        </div>

        <div className={styles.tile_content}>
          <div className={styles.tile_bar} />
          <h3>{title}</h3>
          <div className={styles.desc_wrapper}>
            <p className={styles.desc}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const TileSpotlight = ({
  title,
  body,
  tiles,
  classProp = '',
}: TileSpotlightPropsT) => {
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
          {tiles.map(({ image, imageAlt, title, description }, i) => {
            return (
              <Tile
                key={i}
                image={image}
                imageAlt={imageAlt}
                title={title}
                description={description}
              />
            );
          })}
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
