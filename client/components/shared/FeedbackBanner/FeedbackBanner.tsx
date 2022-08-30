import styles from './FeedbackBanner.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad';

type FeedbackBannerPropsT = {
  classProp?: string;
};

const FeedbackBanner = ({ classProp = '' }: FeedbackBannerPropsT) => {
  const Message = `We'd love to hear what you think of Hubs — what you've enjoyed and what 
  you think we're missing. We'll only use your feedback to improve the product. Your personal 
  information will never be shared.`;

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      <div className={styles.container}>
        <h3>Tell us what you think</h3>
        <div className={styles.content}>
          <p>{Message}</p>
          <Button
            classProp={styles.button}
            category={ButtonCategoriesE.PRIMARY_SOLID}
            text="Give Feedback"
          />
        </div>
      </div>
    </div>
  );
};

export default FeedbackBanner;
