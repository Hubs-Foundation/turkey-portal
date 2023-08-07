import styles from './Grid.module.scss';
import Image from 'next/image';
import Bar from '@Shared/Bar/Bar';
import { useMobileDown } from 'hooks/useMediaQuery';
import MobileCarousel, { SlideT } from '@Shared/MobileCarousel/MobileCarousel';
import GridImage from 'public/grid_X3.png';
import openRoom from 'public/open-room.png';

const Grid = () => {
  const isMobileDown = useMobileDown();
  const slides: SlideT[] = [
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
    { alt: 'open room', src: openRoom },
  ];

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
          <MobileCarousel slides={slides} />
        ) : (
          <section className={styles.grid_wrapper}>
            <Image
              src={GridImage}
              width={1200}
              height={546}
              alt="grid of images of hubs"
            />
          </section>
        )}
      </div>
    </section>
  );
};

export default Grid;
