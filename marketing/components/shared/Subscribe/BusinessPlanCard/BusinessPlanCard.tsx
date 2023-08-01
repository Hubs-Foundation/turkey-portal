import { useState } from 'react';
import { Modal, Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import ContactFormModal from 'components/modals/ContactFormModal/ContactFormModal';
import styles from './BusinessPlanCard.module.scss';

const BusinessPlanCard = () => {
  const [showModal, setShowModal] = useState<Boolean>(false);

  /**
   * Close Modal
   */
  const handleCloseModal = () => {
    setShowModal(false);
  };

  /**
   * Open Modal
   */
  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <h2 className="heading-lg mb-24">Business</h2>
          <p>
            Need dedicated infrastructure, custom clients, or something else?
          </p>

          <Button
            onClick={handleOpenModal}
            label="Contact us"
            text="Contact us"
            category={ButtonCategoriesE.SECONDARY_SOLID}
          />
        </div>
      </div>
      <Modal onClose={handleCloseModal} isVisible={showModal}>
        <ContactFormModal onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default BusinessPlanCard;
