import React from 'react';
import styles from './SubscriptionModal.module.scss';
import { Icon, Button, ButtonCategoriesE } from '@mozilla/lilypad';

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
  const handleCloseClick = () => {
    onClose && onClose();
  };

  return (
    <div className={classProp}>
      {/* HEADER  */}
      <div className={styles.header}>
        {/* TODO update icon asset  */}
        <Icon name="alert-circle" size={24} classProp="margin-right-10" />
        <h2 className={styles.title}>Cancel Subscription</h2>
      </div>

      {/* MODAL CONTENTS  */}
      <div className={styles.content}>
        <p className="u-body-md">
          This will stop the auto renew of <b>{subdomain}</b> on {cancelDate}.
          As a result, <b>the following will occur after {cancelDate}:</b>
        </p>

        <ul className="u-body-md">
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

        <p className="u-body-md">
          If you are happy to proceed, please continue to your Firefox Accounts
          page where you can finish cancelling your subscription.
        </p>
      </div>

      {/* FOOTER ACTIONS  */}
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_container}>
          <Button
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            text="Nevermind"
            classProp="margin-right-10-desktop"
            onClick={handleCloseClick}
          />
          <Button
            category={ButtonCategoriesE.PRIMARY_SOLID}
            classProp="margin-bottom-24-mobile"
            text="Continue to Firefox Account"
          />
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
