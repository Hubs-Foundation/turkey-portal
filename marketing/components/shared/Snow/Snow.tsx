import Image from 'next/image';
import snowTop from '../../../public/snow-top.png';
import snowBottom from '../../../public/snow-bottom.png';
import styles from './Snow.module.scss';

type SnowPropsT = {
  location?: 'top' | 'bottom';
  classProp?: string;
};

const Snow = ({ location = 'top' }: SnowPropsT) => {
  return (
    <div className={styles[`snow_${location}`]}>
      <Image
        src={location === 'top' ? snowTop : snowBottom}
        alt="snow background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        placeholder="blur"
      />
    </div>
  );
};

export default Snow;
