import { useState } from 'react';
import styles from './SubCard.module.scss';
import CardButton from '../../shared/CardButton/CardButton';
import { SubscriptionT } from 'services/subscription.service';
import Modal from '@Shared/Modal/Modal';
import SubscriptionModal from 'components/Modals/SubscriptionModal/SubscriptionModal';
import { HubT } from 'types/General';

type SubCardPropsT = {
  hub: HubT;
  subscription: SubscriptionT;
  currency?: string;
  price?: number;
  classProp?: string;
};

const SubCard = ({
  hub,
  subscription,
  price = 5,
  currency = 'USD',
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

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.container}>

        {/* Note: this button needs to only be shown on details page ones we open it up to multiple 
        hubs so this button is better mapped to a specific hub  */}
        <CardButton
          icon="settings"
          title="Admin Panel"
          description="Manage the scenes, avatars, accounts and access rules for this hub."
        />

        <div className={styles.header}>
          {/* PAYMENT */}
          <div className={styles.header_block}>
            <div>
              <span className={styles.price}>${price.toFixed(2)}</span>
              <span className={styles.currency}>{currency}</span>
            </div>
            <div className={styles.label}>Monthly Payment</div>
          </div>

          {/* NEXT PAYMENT */}
          <div className={styles.header_block}>
            <div className={styles.month}>{subscription.next_payment}</div>
            <div className={styles.label}>Next Payment</div>
          </div>
        </div>

        {/* WIDGET ACTIONS */}
        <CardButton
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
      show up in the details view once we start having mutiple hubs. Right now the cancel sub 
      as well as the admin button are in both the dash and details ONLY while we have one hub
      otherwise these buttons would not know what hub to cancel. So for now this subscription
      modal should just get the first and only hub data.. */}

      {/* TODO pull subscption data "Cancel Date" and  */}
      {showModal && (
        <Modal onClose={handleCloseModal}>
          <SubscriptionModal 
            cancelDate={subscription.end_of_cycle}
            subdomain={hub.subdomain}
            onClose={handleCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default SubCard;
