import { useMemo } from 'react';
import styles from './Grid.module.scss';
import Image from 'next/image';
import Bar from '@Shared/Bar/Bar';
import { useMobileDown } from 'hooks/useMediaQuery';
import MobileCarousel, { SlideT } from '@Shared/MobileCarousel/MobileCarousel';
// Assets
import GridImage from 'public/grid_X3.png';
import slideTV from 'public/slide-tv.png';
import slideFort from 'public/slide-fort.png';
import slideTree from 'public/slide-tree.png';
import slideRoom from 'public/slide-room.png';
import slideForest from 'public/slide-forest.png';
import slideBasketball from 'public/slide-basketball.png';

const Grid = () => {
  const isMobileDown = useMobileDown();
  const slides: SlideT[] = useMemo(() => {
    return [
      { alt: 'In a forest', src: slideFort },
      { alt: 'Large tree', src: slideTree },
      { alt: 'Open room', src: slideRoom },
      { alt: 'Green forest', src: slideForest },
      { alt: 'Basketball court', src: slideBasketball },
      { alt: 'Watching TV', src: slideTV },
    ];
  }, []);

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
          <section className="text-center">
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
