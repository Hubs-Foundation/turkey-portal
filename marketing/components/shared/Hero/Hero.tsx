import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';

type HeroPropsT = {
  background: StaticImageData | string;
  title?: string;
  body?: string;
  ctaTitle?: string;
  ctaClick?: Function;
  ctaHref?: string;
  heroAlt?: string;
  classProp?: string;
};

const Hero = ({
  background,
  title,
  body,
  ctaTitle,
  ctaClick,
  ctaHref = '#',
  heroAlt = 'hero image',
  classProp = '',
}: HeroPropsT) => {
  const router = useRouter();

  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();
    ctaHref && router.push(ctaHref);
  }, [ctaClick, ctaHref, router]);

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
            {title && <h3 className="heading-xxl mb-16">{title}</h3>}
            {body && <p className="body-md mb-24">{body}</p>}
            {ctaTitle && (
              <Button
                href={ctaHref}
                label={ctaTitle}
                text={ctaTitle}
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
