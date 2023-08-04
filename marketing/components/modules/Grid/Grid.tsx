import styles from './Grid.module.scss';
import Image from 'next/image';
import Bar from '@Shared/Bar/Bar';
import GridImage from 'public/grid_X3.png';
import { useMobileDown } from 'hooks/useMediaQuery';

const Grid = () => {
  const isMobileDown = useMobileDown();

  return (
    <section className={styles.wrapper}>
      <div>
        {/* HEADER */}
        <section className={styles.header_wrapper}>
          <div className={styles.header_container}>
            <div className={styles.bar_wrapper}>
              <Bar />
            </div>
            <h2 className="heading-xxl mt-4 mb-18">
              Join thousands of innovators building with Hubs
            </h2>
          </div>
        </section>

        {isMobileDown ? (
          <div>I'm mobile</div>
        ) : (
          <section className={styles.grid_wrapper}>
            <Image src={GridImage} width={1200} height={546} />
          </section>
        )}
      </div>
    </section>
  );
};

export default Grid;
