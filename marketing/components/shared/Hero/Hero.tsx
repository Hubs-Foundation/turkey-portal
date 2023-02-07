import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useMobileDown } from 'hooks/useMediaQuery';
import { HeroT } from 'types';

interface HeroPropsI extends HeroT {
  classProp?: string;
}

const Hero = ({
  desktopImage,
  mobileImage,
  title,
  body,
  ctaTitle,
  ctaHref = '#',
  imageAlt = 'hero image',
  classProp = '',
}: HeroPropsI) => {
  const router = useRouter();
  const isMobile = useMobileDown();

  const onCtaClick = useCallback(() => {
    ctaHref && router.push(ctaHref);
  }, [ctaHref, router]);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <Image
          src={isMobile ? mobileImage.url : desktopImage.url}
          alt={imageAlt}
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
