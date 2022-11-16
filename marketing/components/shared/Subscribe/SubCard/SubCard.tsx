import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import styles from './SubCard.module.scss';
import { ReactNode } from 'react';

type SubCardPropsT = {
  title?: string;
  children?: ReactNode;
  cta?: string;
  ctaUrl?: string;
  classProp?: string;
};

const SubCard = ({
  title,
  children,
  cta,
  ctaUrl,
  classProp = '',
}: SubCardPropsT) => {
  const onCtaClick = () => {
    if (!ctaUrl) return;
    window.open(ctaUrl);
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        {title && <h2 className="u-heading-lg mb-24">{title}</h2>}
        {children && <>{children}</>}
        {cta && (
          <Button
            onClick={onCtaClick}
            label={cta}
            text={cta}
            category={ButtonCategoriesE.SECONDARY_SOLID}
          />
        )}
      </div>
    </div>
  );
};

export default SubCard;
