import styles from './ContactFormModal.module.scss';
import { useCallback } from 'react';
import {
  Icon,
  Button,
  ButtonCategoriesE,
  Input,
  Select,
  OptionT,
  TextArea,
} from '@mozilla/lilypad-ui';

type ContactFormModalPropsT = {
  onClose: () => void;
  classProp?: string;
};

const ContactFormModal = ({
  onClose,
  classProp = '',
}: ContactFormModalPropsT) => {
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
    onClose && onClose();
  }, [onClose]);

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      {/* HEADER  */}
      <h2 className="heading-md mb-32">Get in touch with us</h2>

      {/* MODAL CONTENTS  */}
      <div className={styles.content}>
        <Input
          id="name"
          name="name"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          type="email"
          label="Name"
          placeholder="name"
          required={true}
          classProp="mb-16"
        />
        <Input
          id="email"
          name="email"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          label="Email Address"
          placeholder="name@email.com"
          required={true}
          classProp="mb-16"
        />

        <Input
          id="organization"
          name="organization name"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          label="Organization Name"
          placeholder="Enter the name of your organization"
          classProp="mb-16"
        />

        <Select
          id="subject"
          name="organization name"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          label="Subject"
          classProp="mb-16"
          required={true}
          options={[
            { value: 'Technical question', title: 'Technical question' },
            { value: 'Hubs availability', title: 'Hubs availability' },
            { value: 'Room capacity', title: 'Room capacity' },
          ]}
        />

        <TextArea
          id="organization"
          name="message"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          required={true}
          label="Message"
          placeholder="Enter your message or comment here"
          classProp="mb-16"
        />

        <a
          href="https://www.mozilla.org/en-US/privacy/websites/"
          rel="noopener noreferrer"
          target="_blank"
          className="primary-link"
        >
          Privacy Notice
        </a>
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
            label="submit"
            category={ButtonCategoriesE.PRIMARY_SOLID}
            classProp="mb-24-mb"
            text="Submit"
            type="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactFormModal;
