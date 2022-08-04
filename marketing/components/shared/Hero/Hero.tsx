import { useCallback } from 'react';
import styles from './Hero.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';

type HeroPropsT = {
  background: string;
  title?: string;
  body?: string;
  cta?: string;
  ctaClick?: Function;
  ctaLink?: string;
  classProp?: string;
};

const Hero = ({
  background,
  title,
  body,
  cta,
  ctaClick,
  ctaLink = '#',
  classProp = '',
}: HeroPropsT) => {
  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();
  }, [ctaClick]);

  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div
        className={styles.container}
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className={styles.contents}>
          {title ? <h3>{title}</h3> : null}
          {body ? <h3>{body}</h3> : null}
          <a href={ctaLink}>
            <Button
              text={cta}
              onClick={onCtaClick}
              category={ButtonCategoriesE.PRIMARY_SOLID}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
