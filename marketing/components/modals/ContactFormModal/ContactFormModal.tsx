import styles from './ContactFormModal.module.scss';
import { useCallback, useState } from 'react';
import {
  Icon,
  Button,
  ButtonCategoriesE,
  Input,
  Select,
  OptionT,
  TextArea,
} from '@mozilla/lilypad-ui';
import { CountryOptions } from 'types/Countries';
import { useFormik } from 'formik';
import validate from './validate';

type ContactFormModalPropsT = {
  onClose: () => void;
  classProp?: string;
};

type NewContactT = {
  name: string;
  email: string;
  organization_name: string;
  country: string;
  subject: string;
  field_of_activity: string;
  message: string;
};

const ContactFormModal = ({
  onClose,
  classProp = '',
}: ContactFormModalPropsT) => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);

  /**
   * On Form Error
   */
  const onError = useCallback(() => {
    setResponseStatus(false);
    setSubmitted(true);
  }, []);

  /**
   * On Form Success
   */
  const onSuccess = useCallback(() => {
    setResponseStatus(true);
    setSubmitted(true);
  }, []);

  /**
   * On AJAX Resp
   */
  const handleResponse = useCallback(
    (resp: any) => {
      // todo fix any
      const { status, statusText } = resp;
      status !== 200 || statusText !== 'OK' ? onError() : onSuccess();
    },
    [onError, onSuccess]
  );

  const onSubmit = useCallback(
    async (contact: NewContactT) => {
      // todo submit contact here.
      try {
        // const resp = await subscribe(contact);
        // handleResponse(resp);
      } catch (error) {
        console.error(error);
        onError();
      }
    },
    [handleResponse, onError]
  );

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      organization_name: '',
      country: '',
      subject: 'Technical question',
      field_of_activity: 'Business',
      message: '',
    },
    validate,
    onSubmit: onSubmit,
  });

  /**
   * Checkbox Confirm
   */
  const onConfirm = useCallback(() => {
    setConfirm((state) => !state);
  }, []);

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
          id="country"
          name="country"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          label="Country"
          classProp="mb-16"
          required={true}
          options={CountryOptions}
        />

        <Select
          id="subject"
          name="subject"
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
            { value: 'Annual billing', title: 'Annual billing' },
            { value: 'Partnership', title: 'Partnership' },
            { value: 'Server localization', title: 'Server localization' },
            { value: 'Event support', title: 'Event support' },
            { value: 'Other', title: 'Other (specify in message)' },
          ]}
        />

        <Select
          id="activity"
          name="activity"
          onChange={() => {}}
          onBlur={() => {}}
          value={''}
          label="Field of Activity"
          classProp="mb-16"
          required={true}
          options={[
            { value: 'Business', title: 'Business' },
            { value: 'Education', title: 'Education' },
            { value: 'Research', title: 'Research' },
            { value: 'Other', title: 'Other (specify in message)' },
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
