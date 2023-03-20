import { useState, useCallback } from 'react';
import styles from './EmailSignUp.module.scss';
import { Checkbox, RadioButton, Input, Button } from '@mozilla/lilypad-ui';
import Image from 'next/image';
import Success from './Success/Success';
import Error from './Error/Error';
import Swoosh from '@Shared/Swoosh/Swoosh';
import {
  subscribe,
  BasketBodyT,
  BasketResponseT,
} from 'services/basket.service';
import { useDesktopDown } from 'hooks/useMediaQuery';
import { useFormik } from 'formik';
import validate from './validate';
// Assets
import donutMailMan from '../../../public/donut_mail_man.jpg';

type NewSubscriptionT = {
  email: string;
  email_format: string;
};

const EmailSignUp = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const isDesktopDown = useDesktopDown();

  /**
   * On Form Error
   */
  const newsletterError = useCallback(() => {
    setResponseStatus(false);
    setSubmitted(true);
  }, []);

  /**
   * On Form Success
   */
  const newsletterSuccess = useCallback(() => {
    setResponseStatus(true);
    setSubmitted(true);
  }, []);

  /**
   * On AJAX Resp
   */
  const handleResponse = useCallback(
    (resp: BasketResponseT) => {
      const { status, statusText } = resp;
      status !== 200 || statusText !== 'OK'
        ? newsletterError()
        : newsletterSuccess();
    },
    [newsletterError, newsletterSuccess]
  );

  const onSubmit = useCallback(
    async (subscription: NewSubscriptionT) => {
      const { email, email_format } = subscription;
      const body: BasketBodyT = {
        email: email,
        format: email_format,
        newsletters: 'hubs',
        lang: navigator.language,
        source_url: window.location.origin,
      };

      try {
        const resp = await subscribe(body);
        handleResponse(resp);
      } catch (error) {
        console.error(error);
        newsletterError();
      }
    },
    [handleResponse, newsletterError]
  );

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      email: '',
      email_format: 'html',
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
   * Checkbox Label
   * @returns JSX
   */
  const Label = () => {
    return (
      <>
        I&apos;m okay with Mozilla handling my info as explained in this <br />
        <a
          href="https://www.mozilla.org/en-US/privacy/websites/"
          rel="noopener noreferrer"
          target="_blank"
          className="primary-link"
        >
          Privacy Notice
        </a>
      </>
    );
  };

  return (
    <section className={styles.section_wrapper}>
      {!isDesktopDown && <Swoosh />}

      <div className={styles.section_container}>
        <div className={styles.card_wrapper}>
          <div className={styles.card_header}>
            {isDesktopDown && (
              <div className={styles.bar_wrapper}>
                <div className={styles.bar}></div>
              </div>
            )}
            <h2 className="heading-lg mb-16">Get immersed in Hubs!</h2>
            <p className="body-md mb-32">
              Sign up here to get updates on what is new with Hubs and we will
              keep you up to date with the latest {!isDesktopDown && <br />}{' '}
              news, updates, and product offerings. We can&apos;t wait to show
              you what we have been working on!
            </p>
          </div>

          <div className={styles.card_contents}>
            {/* IMAGE  */}
            {!isDesktopDown && (
              <div className={styles.card_image}>
                <Image width={440} src={donutMailMan} alt="donut mail man" />
              </div>
            )}

            {/* FORM  */}
            <form className={styles.form} onSubmit={formik.handleSubmit}>
              {submitted ? (
                responseStatus ? (
                  <Success />
                ) : (
                  <Error />
                )
              ) : (
                <div className="flex-box">
                  {/* EMAIL  INPUT*/}

                  <Input
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    type="email"
                    label="Email Address"
                    placeholder="name@email.com"
                    required={true}
                    classProp="margin-bottom-16"
                  />

                  {/* EMAIL FORMAT RADIO SELECT  */}
                  <fieldset
                    id="email_format"
                    onChange={formik.handleChange}
                    className="margin-bottom-16"
                  >
                    <legend className={styles.form_legend}>Format</legend>
                    <div className="flex">
                      <RadioButton
                        groupValue={formik.values.email_format}
                        label="HTML"
                        value="html"
                        id="html_id"
                        groupName="email_format"
                      />
                      <RadioButton
                        groupValue={formik.values.email_format}
                        label="Text"
                        value="text"
                        id="text_id"
                        groupName="email_format"
                      />
                    </div>
                  </fieldset>

                  {/* CONFIRMATION CHECKBOX  */}
                  <Checkbox
                    classProp="content-box ml-13"
                    onChange={onConfirm}
                    checked={confirm}
                    label={<Label />}
                  />

                  {/* SUBMIT  */}
                  <Button
                    classProp="mt-16"
                    label="submit"
                    type="submit"
                    disabled={!confirm}
                    text="Join the Mailing List"
                  />
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailSignUp;
