import styles from './ErrorBox.module.scss';
import { Button, ButtonCategoriesE, Icon } from '@mozilla/lilypad';

type ErrorBoxPropsT = {
  onTryAgainClick: Function;
  message: string;
  classProp?: string;
};

const ErrorBox = ({ message, onTryAgainClick, classProp }: ErrorBoxPropsT) => {

  /**
   * Try Again Event
   */
  const handleTryAgainClick = () => {
    onTryAgainClick();
  };


  /**
   * Contact Click
   */
  const handleContactClick = () => {
    // TODO - hook up subdomian update attempts to redux so that we can call the update
    // hubs service here. 
    console.log('doing contact stuff');
  }; 

  return (
    <div className={`${styles.error_wrapper} ${classProp}`}>
      <div className={styles.error_icon_wrapper}>
        <Icon name="alert-triangle" size={28} classProp={styles.error_icon} />
      </div>
      <div className={styles.error_container}>
        <p>{message}</p>
        <div className={styles.error_actions}>
          <Button
            text="Try again now"
            classProp="margin-right-12"
            onClick={handleTryAgainClick}
          />
          <Button
            text="Contact Us"
            category={ButtonCategoriesE.PRIMARY_OUTLINE}
            onClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ErrorBox;
