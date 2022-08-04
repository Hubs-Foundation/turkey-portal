import styles from './FiftyFifty.module.scss';
import Image from 'next/image';

export enum FiftyFiftyLayoutE {
  LEFT = 'left',
  RIGHT = 'right',
}

type FiftyFiftyPropsT = {
  image: string;
  title?: string;
  subTitle?: string;
  body?: string;
  layout?: FiftyFiftyLayoutE;
  classProp?: string;
};

const FiftyFifty = ({
  image,
  title,
  subTitle,
  body,
  layout = FiftyFiftyLayoutE.LEFT,
  classProp = '',
}: FiftyFiftyPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={`${styles.container} ${styles['container_' + layout]}`}>

        {/* Contents  */}
        <div className={styles.contents}>
          {subTitle ? <p>{subTitle}</p> : null}
          {title ? <h3>{title}</h3> : null}
          {body ? <p>{body}</p> : null}
        </div>

        {/* Image  */}
        <div className={styles.image}>
          <Image width="400" height="400" src={image} />
        </div>
      </div>
    </section>
  );
};

export default FiftyFifty;
