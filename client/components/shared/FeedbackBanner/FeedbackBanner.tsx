import { useCallback, useState } from 'react';
import styles from './FeedbackBanner.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import FadeIn from '@Util/FadeIn';

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
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const Message = `We'd love to hear what you think of Hubs — what you've enjoyed and what 
  you think we're missing. We'll only use your feedback to improve the product. Your personal 
  information will never be shared.`;

  const feedbackClick = () => {
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  const onToggleClick = () => {
    isOpen ? handleClose() : handleOpen();
  };

  const handleOpen = useCallback(() => {
    setIsVisible((state) => !state);
    setIsOpen((state) => !state);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen((state) => !state);
  }, []);

  const handleOnComplete = useCallback(() => {
    if (!isOpen) setIsVisible(false);
  }, [isOpen]);

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3>Tell us what you think</h3>
          <Button
            icon={isOpen ? 'chevron-down' : 'chevron-up'}
            label="toggle"
            category={ButtonCategoriesE.SECONDARY_CLEAR}
            onClick={onToggleClick}
          />
        </div>

        <FadeIn isVisible={isOpen} onComplete={handleOnComplete}>
          {isVisible && (
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
          )}
        </FadeIn>
      </div>
    </div>
  );
};

export default FeedbackBanner;
