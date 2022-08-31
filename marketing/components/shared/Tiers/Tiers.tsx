import Image from 'next/image';
import styles from './Tiers.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';

type TiersPropsT = {
  tiers: TierPropsT[];
  classProp?: string;
};

export type TierPropsT = {
  image: string;
  title: string;
  subtitle?: string;
  info: string;
  link?: string;
  linkUrl?: string;
  price?: string;
  cta?: string;
  ctaUrl?: string;
};

/**
 * Tier Tile
 */
const Tier = ({
  image,
  title,
  subtitle,
  info,
  link,
  linkUrl,
  price,
  cta,
  ctaUrl,
}: TierPropsT) => {
  return (
    <section className={styles.tier_wrapper}>
      <div className={styles.tier_container}>
        {/* TIER IMAGE  */}
        <div className={styles.image_wrapper}>
          <Image src={image} width="100" height="100" />
        </div>

        {/* TITLE  */}
        <div>{title}</div>

        {/* SUBTITLE  */}
        {subtitle && <div>{subtitle}</div>}

        {/* TIER INFO  */}
        <div>{info}</div>

        {/* LINK - usually a substitute if no CTA  */}
        {link && <a href={linkUrl}>{link}</a>}

        {/* PRICE  */}
        {price && <div>{price} per month</div>}

        {/* CTA  */}
        {cta && (
          <Button
            href={ctaUrl}
            category={ButtonCategoriesE.PRIMARY_SOLID}
            text={cta}
          />
        )}
      </div>
    </section>
  );
};

const Tiers = ({ tiers, classProp = '' }: TiersPropsT) => {
  return (
    <section className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.tiers}>
          {tiers.map(
            (
              {
                image,
                title,
                subtitle,
                info,
                link,
                linkUrl,
                price,
                cta,
                ctaUrl,
              },
              i
            ) => {
              return (
                <Tier
                  key={i}
                  image={image}
                  title={title}
                  subtitle={subtitle}
                  info={info}
                  link={link}
                  linkUrl={linkUrl}
                  price={price}
                  cta={cta}
                  ctaUrl={ctaUrl}
                />
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default Tiers;
