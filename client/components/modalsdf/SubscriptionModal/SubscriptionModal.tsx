import styles from './SubscriptionModal.module.scss';
import { useCallback } from 'react';
import { Icon, Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { FXA_SERVER } from 'config';

type SubscriptionModalT = {
  subdomain: string;
  cancelDate: string;
  onClose: () => void;
  classProp?: string;
};

const SubscriptionModal = ({
  subdomain,
  cancelDate,
  onClose,
  classProp = '',
}: SubscriptionModalT) => {
  /**
   * Close Modal
   */
  const handleCloseClick = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  /**
   * Manage Account
   */
  const onManageAccountClick = useCallback(() => {
    window.open(`https://${FXA_SERVER}/settings`);
    onClose && onClose();
  }, [onClose]);

  return (
    <div className={classProp}>
      {/* HEADER  */}
      <div className={styles.header}>
        {/* TODO update icon asset  */}
        <Icon name="info" size={24} classProp="mr-10" />
        <h2 className={styles.title}>Cancel Subscription</h2>
      </div>

      {/* MODAL CONTENTS  */}
      <div className={styles.content}>
        <p className="body-md">
          This will stop the auto renew of <b>{subdomain}</b> on {cancelDate}.
          As a result, <b>the following will occur after {cancelDate}:</b>
        </p>

        <ul className="body-md">
          <li>The Hub will be deleted.</li>
          <li>
            All assets (avatars, scenes, 3D models) installed on the hub will be
            permenantly deleted.
          </li>
          <li>
            The subdomain <b>{subdomain}</b> will be released and made available
            for other hub owners to use.
          </li>
        </ul>

        <p className="body-md">
          If you are happy to proceed, please continue to your Firefox Accounts
          page where you can finish cancelling your subscription.
        </p>
      </div>

      {/* FOOTER ACTIONS  */}
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_container}>
          <Button
            label="cancel"
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            text="Nevermind"
            classProp="mr-10-dt"
            onClick={handleCloseClick}
          />
          <Button
            label="continue to firefox account"
            onClick={onManageAccountClick}
            category={ButtonCategoriesE.PRIMARY_SOLID}
            classProp="mb-24-mb"
            text="Continue to Firefox Account"
            target="_blank"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
