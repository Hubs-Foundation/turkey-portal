import { useState } from 'react';
import styles from './EmailSignUp.module.scss';
import Image from 'next/image';
import { Button, Modal } from '@mozilla/lilypad-ui';
import Legacy from 'components/modules/Legacy';
import EmailForm from './EmailForm/EmailForm';
import { useDesktopDown } from 'hooks/useMediaQuery';
import donutMailMan from 'public/donut_mail_man.png';

const EmailSignUp = () => {
  const isDesktopDown = useDesktopDown();
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

  const EmailSection = () => (
    <div className={styles.section_container}>
      <div className={styles.section_contents}>
        <h2 className="heading-md mb-12">
          Get immersed with the Hubs newsletter!
        </h2>
        <p className="mb-16 body-md">
          Sign up here to get updates on what is new with Hubs and we will keep
          you up to date with the latest news, updates, and product offerings.
          We can&apos;t wait to show you what we have been working on!
        </p>
        <Button
          text="Sign up"
          category="secondary_outline"
          onClick={handleOpenModal}
        />
      </div>
      <div className={styles.section_image}>
        <Image
          width={402}
          height={233.67}
          src={donutMailMan}
          alt="donut mail man"
        />
      </div>
    </div>
  );

  return (
    <>
      <Legacy />
      <section className={styles.section_wrapper}>
        {isDesktopDown ? <EmailForm /> : <EmailSection />}

        <Modal
          onClose={handleCloseModal}
          isVisible={showModal}
          classProp={styles.modal}
        >
          <EmailForm handleClose={handleCloseModal} />
        </Modal>
      </section>
    </>
  );
};

export default EmailSignUp;
