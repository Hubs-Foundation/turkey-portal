import { useState, useCallback } from 'react';
import styles from './SubCard.module.scss';
import CardButton from '../../shared/CardButton/CardButton';
import { MonthE } from 'types/Date';
import { SubscriptionT } from 'services/subscription.service';
import Modal from '@Shared/Modal/Modal';
import SubscriptionModal from 'components/Modals/SubscriptionModal/SubscriptionModal';
import { HUB_ROOT_DOMAIN, FXA_SERVER } from 'config';

type SubCardPropsT = {
  subdomain: string;
  subscription: SubscriptionT;
  currency?: string;
  price?: number;
  classProp?: string;
};

const SubCard = ({
  subdomain,
  subscription,
  classProp = '',
}: SubCardPropsT) => {
  const [showModal, setShowModal] = useState<Boolean>(false);

  /**
   * Cancel Subscription
   */
  const onCancelSubClick = () => {
    setShowModal(true);
  };

  /**
   * Close Modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Route to Admin Panel
   */
  const handleAdminPanelClick = useCallback(() => {
    window.open(`https://${subdomain}.${HUB_ROOT_DOMAIN}/admin`);
  }, [subdomain]);

  /**
   * Manage Account
   */
  const onManageAccountClick = useCallback(() => {
    window.open(`https://${FXA_SERVER}/settings`);
  }, []);

  /**
   * Get Formatted Date
   */
  const subscriptionDate = useCallback(
    (fullDate?: boolean) => {
      const date = new Date(subscription.subscriptionEndTimestampS);
      const formattedDate = fullDate
        ? `${MonthE[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`
        : `${MonthE[date.getMonth()]} ${date.getDay()}`;
      return formattedDate;
    },
    [subscription]
  );

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>
        {/* Note: When we open the dashboard to multiple hubs this admin button
        should only show on the details page. Not on the main dashboard  */}

        <CardButton
          onClick={handleAdminPanelClick}
          icon="settings"
          title="Admin Panel"
          description="Manage the scenes, avatars, accounts and access rules for this hub."
        />

        <div className={styles.header}>
          {/* PAYMENT */}
          <div className={styles.header_block}>
            <div>
              <span className={styles.price}>
                ${Number(subscription.amount).toFixed(2)}
              </span>
              <span className={styles.currency}>{subscription.currency}</span>
            </div>
            <div className={styles.label}>Monthly Payment</div>
          </div>

          {/* NEXT PAYMENT */}
          <div className={styles.header_block}>
            <div className={styles.month}>{subscriptionDate(false)}</div>
            <div className={styles.label}>Next Payment</div>
          </div>
        </div>

        {/* WIDGET ACTIONS */}
        <CardButton
          onClick={onManageAccountClick}
          icon="credit-card"
          title="Manage Subscription"
          description="View your active subscriptions and change your payment information. "
          classProp="margin-bottom-24"
        />

        <CardButton
          onClick={onCancelSubClick}
          icon="settings"
          title="Cancel subscription"
        />
      </div>

      {/* CANCEL SUB MODAL  */}
      {/* Note: The cancel subscription button should not show up on the main dash and should only
      show up in the details view once we start having multiple hubs. Right now the cancel sub 
      as well as the admin button are in both the dash and details ONLY while we have one hub
      otherwise these buttons would not know what hub to cancel. So for now this subscription
      modal should just get the first and only hub data.. */}

      {/* TODO pull subscption data "Cancel Date" */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <SubscriptionModal
            cancelDate={subscriptionDate(true)}
            subdomain={subdomain}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default SubCard;
