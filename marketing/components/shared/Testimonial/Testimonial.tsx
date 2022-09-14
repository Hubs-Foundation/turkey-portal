import Image from 'next/image';
import styles from './Testimonial.module.scss';
import jacobErvinAvatar from '../../../public/jacob_ervinAvatar.png';
import testimonialBackground from '../../../public/testimonial_background.jpg';
import messageCarrot from '../../../public/message_carrot.svg';
import { useDesktopDown, useTabletDown } from 'hooks/useMediaQuery';
import quoteRight from '../../../public/quote_right.svg';
import quoteLeft from '../../../public/quote_left.svg';

type TestimonialPropsT = {
  classProp?: string;
};

const Testimonial = ({ classProp = '' }: TestimonialPropsT) => {
  const isDesktopDown = useDesktopDown();
  const isTabletDown = useTabletDown();

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <h2>Here&apos;s what people are saying:</h2>
        </div>

        {/* MAIN CONTENT  */}
        <div className={styles.content_wrapper}>
          <Image
            src={testimonialBackground}
            alt="blog background"
            objectFit="cover"
            objectPosition="center"
            layout={isTabletDown ? 'fill' : undefined}
          />

          <div className={styles.content}>
            {/* AVATAR */}
            <div className={styles.avatar_wrapper}>
              <div className={styles.avatar}>
                <Image
                  src={jacobErvinAvatar}
                  height={isTabletDown ? 165 : 230}
                  width={isTabletDown ? 165 : 230}
                  alt="blog background"
                />
              </div>
            </div>

            <div className={styles.message_wrapper}>
              {/* CARROT  */}
              <div className={styles.message_carrot}>
                <Image
                  src={messageCarrot}
                  alt="message carrot"
                  width={isDesktopDown ? 75 : 100}
                />
              </div>

              {/* TESTIMONIAL MESSAGE  */}
              <div className={styles.message_container}>
                {/* QUOTES  */}
                <div className={styles.quotes}>
                  <Image src={quoteLeft} alt="quote left" />
                  <Image src={quoteRight} alt="quote right" />
                </div>
                <p className={styles.message}>
                  The virtual world ecosystem is much healthier and more
                  accessible with Hubs powering so many creators and
                  entrepreneurs.
                </p>
                <p className={styles.message_name}>
                  - Jacob Ervin - CEO/Co-Founder of Active Replica
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
