import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import styles from './SubCard.module.scss';
import { ReactNode } from 'react';

type SubCardPropsT = {
  title?: string;
  children?: ReactNode;
  cta?: string;
  ctaUrl?: string;
  onCtaClick?: () => void;
  classProp?: string;
};

const SubCard = ({
  title,
  children,
  cta,
  ctaUrl,
  onCtaClick,
  classProp = '',
}: SubCardPropsT) => {
  const handleCtaClick = () => {
    onCtaClick && onCtaClick();
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        {title && <h2 className="heading-lg mb-24">{title}</h2>}
        {children && <>{children}</>}
        {cta && (
          <Button
            onClick={handleCtaClick}
            label={cta}
            text={cta}
            href={ctaUrl}
            category={ButtonCategoriesE.SECONDARY_SOLID}
          />
        )}
      </div>
    </div>
  );
};

export default SubCard;
