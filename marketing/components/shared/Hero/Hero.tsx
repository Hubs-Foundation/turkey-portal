import { useCallback } from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  const onCtaClick = useCallback(() => {
    ctaClick && ctaClick();

    // TODO consider adding anchor functionaltiy to the button component
    // Need to figure out if this is external or internal link / or both.
    // if internal this is fine but external will need more. 
    ctaLink &&
      router.push({
        pathname: ctaLink,
      });
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
          {title && <h3>{title}</h3>}
          {body && <h3>{body}</h3>}
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
