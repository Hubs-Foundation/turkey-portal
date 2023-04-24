import { useCallback, useState } from 'react';
import styles from './FeedbackBanner.module.scss';
import { Button, ButtonCategoriesE, Icon } from '@mozilla/lilypad-ui';
import FadeInWrapper from '@Util/FadeIn';

type FeedbackBannerPropsT = {
  email: string;
  subject: string;
  classProp?: string;
};

const FeedbackBanner = ({
  email,
  subject,
  classProp = '',
}: FeedbackBannerPropsT) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Message = `We'd love to hear what you think of Hubs — what you've enjoyed and what 
  you think we're missing. We'll only use your feedback to improve the product. Your personal 
  information will never be shared.`;

  const feedbackClick = () => {
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const onToggleClick = () => {
    setIsOpen((state) => !state);
  };

  const handleOnComplete = useCallback(() => {
    // Scroll banner into view after opening.
    if (isOpen) {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [isOpen]);

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <button
          className={styles.header}
          onClick={onToggleClick}
          aria-label="toggle"
        >
          <h3 className="heading-xs">Tell us what you think</h3>
          <Icon
            name={isOpen ? 'chevron-down' : 'chevron-up'}
            color="currentColor"
          />
        </button>

        <FadeInWrapper visible={isOpen} onComplete={handleOnComplete}>
          <div className={styles.content}>
            <p>{Message}</p>
            <Button
              label="give feedback"
              onClick={feedbackClick}
              classProp={styles.button}
              category={ButtonCategoriesE.SECONDARY_OUTLINE}
              text="Give Feedback"
            />
          </div>
        </FadeInWrapper>
      </div>
    </div>
  );
};

export default FeedbackBanner;
