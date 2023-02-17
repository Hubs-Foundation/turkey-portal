import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Image, { StaticImageData } from 'next/image';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';

type HeroPropsT = {
  background: StaticImageData;
  title?: string;
  body?: string;
  cta?: string;
  ctaClick?: Function;
  ctaLink?: string;
  cta2?: string;
  cta2Click?: Function;
  cta2Link?: string;
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
  cta2,
  cta2Click,
  cta2Link = '#',
  heroAlt = 'hero image',
  classProp = '',
}: HeroPropsT) => {
  const router = useRouter();

  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();
    ctaLink && router.push(ctaLink);
  }, [ctaClick, ctaLink, router]);

  const onCta2Click = useCallback(() => {
    cta2Click && cta2Click();
    cta2Link && router.push(cta2Link);
  }, [cta2Click, cta2Link, router]);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <Image
          src={background}
          alt={heroAlt}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
        />
        <div className={styles.contents_wrapper}>
          <div className={styles.contents}>
            {title && <h3 className="heading-xxl mb-16">{title}</h3>}
            {body && <p className="body-md mb-24">{body}</p>}
            {cta && (
              <Button
                href={ctaLink}
                label={cta}
                text={cta}
                onClick={onCtaClick}
                category={ButtonCategoriesE.PRIMARY_SOLID}
              />
            )}

            {cta2 && (
              <Button
                href={cta2Link}
                label={cta2}
                text={cta2}
                onClick={onCta2Click}
                classProp="ml-10"
                category={ButtonCategoriesE.PRIMARY_OUTLINE}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
