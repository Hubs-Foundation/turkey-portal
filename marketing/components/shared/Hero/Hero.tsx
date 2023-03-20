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
  ctaHref,
  cta2Title,
  cta2Href,
  imageAlt = 'hero image',
  classProp = '',
}: HeroPropsI) => {
  const isMobile = useMobileDown();

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

            {/* CALL TO ACTION LEFT  */}
            {ctaTitle && (
              <Button
                href={ctaHref}
                label={ctaTitle}
                text={ctaTitle}
                category={ButtonCategoriesE.PRIMARY_SOLID}
              />
            )}

            {/* CALL TO ACTION RIGHT  */}
            {cta2Title && (
              <Button
                href={cta2Href}
                label={cta2Title}
                text={cta2Title}
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