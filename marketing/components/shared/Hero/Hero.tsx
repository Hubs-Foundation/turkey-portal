'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image, { StaticImageData } from 'next/legacy/image';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import { useMobileDown } from 'hooks/useMediaQuery';

type HeroPropsT = {
  background: StaticImageData;
  backgroundMobile: StaticImageData;
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
  backgroundMobile,
  title,
  body,
  cta,
  ctaClick,
  ctaLink = '#',
  heroAlt = 'hero image',
  classProp = '',
}: HeroPropsT) => {
  const isMobile = useMobileDown();
  const router = useRouter();

  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();
    ctaLink && router.push(ctaLink);
  }, [ctaClick, ctaLink, router]);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <Image
          src={isMobile ? backgroundMobile : background}
          alt={heroAlt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
        />
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {body && <p className={styles.body}>{body}</p>}
            {cta && (
              <Button
                href={ctaLink}
                label={cta}
                text={cta}
                onClick={onCtaClick}
                category={ButtonCategoriesE.PRIMARY_SOLID}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
