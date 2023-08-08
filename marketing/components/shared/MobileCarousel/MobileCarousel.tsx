import { Swiper, SwiperSlide } from 'swiper/react';
import Image, { StaticImageData } from 'next/image';
import 'swiper/css';

export type SlideT = {
  alt: string;
  src: StaticImageData; // min 500px by 500px
};

type MobileCarouselPropsT = {
  slides: SlideT[];
};

const MobileCarousel = ({ slides }: MobileCarouselPropsT) => {
  return (
    <section>
      <Swiper
        loop={true}
        slidesPerView={1.25}
        spaceBetween={18}
        centeredSlides={true}
      >
        {slides.map(({ src, alt }) => {
          return (
            <SwiperSlide key={alt}>
              <Image src={src} height={500} width={500} alt={alt} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default MobileCarousel;
