import styles from './ErrorBox.module.scss';
import { Button, Icon } from '@mozilla/lilypad-ui';

type ErrorBoxPropsT = {
  onTryAgainClick?: Function;
  message: string;
  canTryAgain?: boolean;
  onClose?: Function;
  classProp?: string;
};

const ErrorBox = ({
  message,
  onTryAgainClick,
  canTryAgain,
  onClose,
  classProp,
}: ErrorBoxPropsT) => {
  /**
   * Try Again Event
   */
  const handleTryAgainClick = () => {
    onTryAgainClick && onTryAgainClick();
  };

  const handleOnClose = () => {
    onClose && onClose();
  };

  /**
   * Contact Click
   */
  const handleContactClick = () => {
    window.open('mailto:hubs-feedback@mozilla.com');
  };

  return (
    <div className={`${styles.error_wrapper} ${classProp}`}>
      {onClose && (
        <Button
          label="close"
          icon="x"
          classProp={styles.close}
          onClick={handleOnClose}
          category="primary_clear"
        />
      )}
      <div className={styles.error_icon_wrapper}>
        <Icon name="alert-triangle" size={28} classProp={styles.error_icon} />
      </div>
      <div className={styles.error_container}>
        <p>{message}</p>
        <div className={styles.error_actions}>
          {canTryAgain && (
            <Button
              label="try again now"
              text="Try again now"
              classProp="mr-12"
              onClick={handleTryAgainClick}
            />
          )}

          <Button
            label="contact us"
            text="Contact Us"
            category="primary_outline"
            onClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorBox;
