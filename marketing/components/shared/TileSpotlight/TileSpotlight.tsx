import Image from 'next/image';
import styles from './TileSpotlight.module.scss';

type TileSpotlightPropsT = {
  title?: string;
  body?: string;
  tiles: TilePropsT[];
  classProp?: string;
};

export type TilePropsT = {
  image: string;
  title: string;
};

/**
 * Spotlight Tile
 */
const Tile = ({ image, title }: TilePropsT) => {
  return (
    <section className={styles.tile_wrapper}>
      <div className={styles.tile_container}>
        <Image src={image} width="200" height="200" />
        <div>{title}</div>
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
      <div className={styles.container}>
        <h2>{title}</h2>
        <p>{body}</p>
        <div className={styles.tiles}>
          {tiles.map(({ image, title }, i) => {
            return <Tile key={i} image={image} title={title} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default TileSpotlight;
