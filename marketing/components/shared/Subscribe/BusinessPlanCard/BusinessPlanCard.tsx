import { useState } from 'react';
import { Modal } from '@mozilla/lilypad-ui';
import SubCard from '../SubCard/SubCard';
import ContactFormModal from 'components/modals/ContactFormModal/ContactFormModal';

const BasePlanCard = () => {
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
      <SubCard title="Business" cta="Contact us" onCtaClick={handleOpenModal}>
        <p>Need dedicated infrastructure, custom clients, or something else?</p>
      </SubCard>
      <Modal onClose={handleCloseModal} isVisible={showModal}>
        <ContactFormModal onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default BasePlanCard;
