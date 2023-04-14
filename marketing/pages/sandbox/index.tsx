import { useState } from 'react';
import Head from 'next/head';
import Modal from '@Shared/Modal/Modal';
import { Button } from '@mozilla/lilypad-ui';
import ContactFormModal from 'components/modals/ContactFormModal/ContactFormModal';

type SandboxPropsT = {};

const Sandbox = ({}: SandboxPropsT) => {
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
    <div className="page_wrapper">
      <Head>
        <title>Sandbox</title>
      </Head>
      <main>
        sand box
        <Button
          label="modal"
          text="open modal"
          onClick={handleOpenModal}
          classProp="mt-100"
        />
        <Modal onClose={handleCloseModal} isVisible={showModal}>
          <ContactFormModal onClose={handleCloseModal} />
        </Modal>
      </main>
    </div>
  );
};

export default Sandbox;

export async function getStaticProps() {
  if (process.env.ENV === 'prod') {
    return { notFound: true };
  }

  return {
    props: {},
  };
}
