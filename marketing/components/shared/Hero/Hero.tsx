import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';

type HeroPropsT = {
  background: StaticImageData;
  title?: string;
  body?: string;
  cta?: string;
  ctaClick?: Function;
  ctaLink?: string;
  heroAlt?: string;
  classProp?: string;
};

const Hero = ({
  background,
  title,
  body,
  cta,
  ctaClick,
  ctaLink = '#',
  heroAlt = 'hero image',
  classProp = '',
}: HeroPropsT) => {
  const router = useRouter();

  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();
    ctaLink && router.push(ctaLink);
  }, [ctaClick, ctaLink, router]);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <Image
          src={background}
          alt={heroAlt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {body && <p className={styles.body}>{body}</p>}
            <a href={ctaLink}>
              <Button
                text={cta}
                onClick={onCtaClick}
                category={ButtonCategoriesE.PRIMARY_SOLID}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
