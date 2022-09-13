import Image from 'next/image';
import styles from './Testimonial.module.scss';
import jacobErvinAvatar from '../../../public/jacob_ervinAvatar.png';
import testimonialBackground from '../../../public/testimonial_background.jpg';

type TestimonialPropsT = {
  classProp?: string;
};

const Testimonial = ({ classProp = '' }: TestimonialPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        {/* HEADER  */}
        <div className={styles.header}>
          <h2>Here's what people are saying:</h2>
        </div>

        {/* CONTENT  */}
        <div className={styles.content_wrapper}>
          <Image
            src={testimonialBackground}
            alt="blog background"
            objectFit="cover"
            objectPosition="center"
          />

          <div className={styles.content}>
            <div className={styles.avatar_wrapper}>
              <Image
                src={jacobErvinAvatar}
                height={230}
                width={230}
                alt="blog background"
              />
            </div>

            <div className={styles.message_wrapper}>
              <p>
                The virtual world ecosystem is much healthier and more
                accessible with Hubs powering so many creators & entrepreneurs.
                - Jacob Ervin - CEO/Co-Founder of Active Replica
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
