import styles from './ContactFormModal.module.scss';
import { useCallback, useState, useContext } from 'react';
import ErrorBox from '@Shared/ErrorBox/ErrorBox';
import {
  Button,
  ButtonCategoriesE,
  Input,
  Select,
  OptionT,
  TextArea,
  NewNotificationT,
  NotificationTypesE,
  NotificationLocationE,
  CategoryE,
} from '@mozilla/lilypad-ui';
import { CountryOptions } from 'types/Countries';
import { useFormik } from 'formik';
import validate from './validate';
import { NotificationContext } from 'contexts/NotificationProvider';

type ContactFormModalPropsT = {
  onClose: () => void;
  classProp?: string;
};

type NewContactT = {
  name: string;
  email: string;
  organization: string;
  country: string;
  subject: string;
  activity: string;
  message: string;
};

const ContactFormModal = ({
  onClose,
  classProp = '',
}: ContactFormModalPropsT) => {
  // const [submitted, setSubmitted] = useState<boolean>(false);
  const [isError, setisError] = useState<boolean>(false);
  const notificationContext = useContext(NotificationContext);

  /**
   * Close Modal
   */
  const handleCloseClick = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  /**
   * On Form Error
   */
  const onError = useCallback(() => {
    setisError(true);
  }, []);

  /**
   * On Form Success
   */
  const onSuccess = useCallback(() => {
    notificationContext.handleDispatchNotification({
      title: 'Success',
      description: 'Your message has been successfully sent',
      duration: 10000,
      type: NotificationTypesE.SUCCESS,
      location: NotificationLocationE.TOP_RIGHT,
      pauseOnHover: true,
      autoClose: false,
      hasIcon: true,
      category: CategoryE.TOAST,
    } as NewNotificationT);
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
      setisError(false);
      console.log('contact', contact);
      onClose();
      onSuccess();
      // todo submit contact here.
      // try {
      //   // const resp = await subscribe(contact);
      //   // handleResponse(resp);
      // } catch (error) {
      //   console.error(error);
      //   onError();
      // }
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
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        {/* MODAL CONTENTS  */}
        <div className={styles.content}>
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
      </form>
    </div>
  );
};

export default ContactFormModal;
