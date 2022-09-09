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
  title: string;
  description: string;
};

/**
 * Spotlight Tile
 */
const Tile = ({ image, title, description }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <div className={styles.tile_image}>
          <Image
            src={image}
            alt={title}
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
  tiles,
  classProp = '',
}: TileSpotlightPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div
        className={styles.bubble_top}
        style={{
          backgroundImage: `url(${bubbleTop.src})`,
        }}
      ></div>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>

        {/* CARDS  */}
        <div className={styles.tiles}>
          {tiles.map(({ image, title, description }, i) => {
            return (
              <Tile
                key={i}
                image={image}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </div>
      <div
        className={styles.bubble_bottom}
        style={{
          backgroundImage: `url(${bubbleBottom.src})`,
        }}
      ></div>
    </section>
  );
};

export default TileSpotlight;
