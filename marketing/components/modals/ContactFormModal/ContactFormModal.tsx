import styles from './ContactFormModal.module.scss';
import { useCallback, useState, useContext } from 'react';
import ErrorBox from '@Shared/ErrorBox/ErrorBox';
import {
  Button,
  Input,
  Select,
  OptionT,
  TextArea,
  NewNotificationT,
} from '@mozilla/lilypad-ui';
import { NewContactT } from 'types';
import { CountryOptions } from 'types/Countries';
import { useFormik } from 'formik';
import validate from './validate';
import { sendEmail, EmailResponseT } from 'services/email.service';
import { NotificationContext } from 'contexts/NotificationProvider';
import SkeletonCard from '@Shared/SkeletonCard/SkeletonCard';

type ContactFormModalPropsT = {
  onClose: () => void;
  classProp?: string;
};

const ContactFormModal = ({
  onClose,
  classProp = '',
}: ContactFormModalPropsT) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const notificationContext = useContext(NotificationContext);

  /**
   * Close Modal
   */
  const handleCloseClick = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  /**
   * On Form Success
   */
  const onSuccess = useCallback(() => {
    notificationContext.handleDispatchNotification({
      title: 'Successfully Sent',
      description: 'We will get back to you within the next two weeks.',
      duration: 8000,
      type: 'success',
      location: 'top_right',
      pauseOnHover: true,
      autoClose: true,
      hasIcon: true,
      category: 'toast',
    } as NewNotificationT);
  }, [notificationContext]);

  /**
   * On AJAX Resp
   */
  const handleResponse = useCallback(
    ({ status }: EmailResponseT) => {
      if (status === 200) {
        onClose();
        onSuccess();
        return;
      }
      setisError(true);
    },
    [onClose, onSuccess]
  );

  const onSubmit = useCallback(
    async (contact: NewContactT) => {
      setisError(false);
      setSubmitting(true);

      try {
        const resp = await sendEmail(contact);
        handleResponse(resp);
      } catch (error) {
        setisError(true);
      }
    },
    [handleResponse]
  );

  /**
   * Init Formik
   */
  const formik = useFormik<NewContactT>({
    initialValues: {
      name: '',
      email: '',
      organization: '',
      country: 'US',
      subject: 'Technical question',
      activity: 'Business',
      message: '',
    },
    validate,
    onSubmit: onSubmit,
  });

  const subjectOptions: OptionT[] = [
    { value: 'Technical question', title: 'Technical question' },
    { value: 'Hubs availability', title: 'Hubs availability' },
    { value: 'Room capacity', title: 'Room capacity' },
    { value: 'Annual billing', title: 'Annual billing' },
    { value: 'Partnership', title: 'Partnership' },
    { value: 'Server localization', title: 'Server localization' },
    { value: 'Event support', title: 'Event support' },
    { value: 'Other', title: 'Other (specify in message)' },
  ];

  const activityOptions: OptionT[] = [
    { value: 'Business', title: 'Business' },
    { value: 'Education', title: 'Education' },
    { value: 'Research', title: 'Research' },
    { value: 'Other', title: 'Other (specify in message)' },
  ];

  return (
    <div className={`${classProp} ${styles.wrapper}`}>
      {/* HEADER  */}
      <h2 className="heading-md mb-32">Get in touch with us</h2>
      {isError && (
        <ErrorBox
          classProp="mb-12"
          title="Form was not submitted"
          body="There was a problem submitting your information, please try again."
        />
      )}

      {submitting && !isError && <SkeletonCard qty={7} category="row" />}

      {!submitting && (
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          {/* MODAL CONTENTS  */}
          <div className="mb-16">
            <Input
              id="name"
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              label="Name"
              placeholder="name"
              required={true}
              classProp="mb-16"
            />
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              label="Email Address"
              placeholder="name@email.com"
              required={true}
              classProp="mb-16"
            />

            <Input
              id="organization"
              name="organization"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.organization}
              label="Organization Name"
              placeholder="Enter the name of your organization"
              classProp="mb-16"
            />

            <Select
              id="country"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              label="Country"
              classProp="mb-16"
              required={true}
              options={CountryOptions}
            />

            <Select
              id="subject"
              name="subject"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subject}
              label="Subject"
              classProp="mb-16"
              required={true}
              options={subjectOptions}
            />

            <Select
              id="activity"
              name="activity"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.activity}
              label="Field of Activity"
              classProp="mb-16"
              required={true}
              options={activityOptions}
            />

            <TextArea
              id="message"
              name="message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
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
                category="primary_outline"
                text="Nevermind"
                classProp="mr-10-dt"
                onClick={handleCloseClick}
              />
              <Button
                label="submit"
                category="primary_solid"
                classProp="mb-24-mb"
                text="Submit"
                type="submit"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactFormModal;
