import { useState, useCallback } from 'react';
import styles from './EmailSignUp.module.scss';
import { useForm, Controller } from 'react-hook-form';
import { Checkbox, Input, RadioButton, Button } from '@mozilla/lilypad';
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
// Assets
import donutMailMan from '../../../public/donut_mail_man.jpg';

type NewSubscription = {
  email: string;
  email_format: string;
};

const EmailSignUp = () => {
  const [confirm, setConfirm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<NewSubscription>({
    defaultValues: {
      email: '',
      email_format: 'html',
    },
  });
  const isDesktopDown = useDesktopDown();

  /**
   * On Form Error
   */
  const newsletterError = () => {
    setResponseStatus(false);
    setSubmitted(true);
  };

  /**
   * On Form Success
   */
  const newsletterSuccess = () => {
    setResponseStatus(true);
    setSubmitted(true);
  };

  /**
   * On AJAX Resp
   */
  const handleResponse = (resp: BasketResponseT) => {
    const { status, statusText } = resp;
    status !== 200 || statusText !== 'OK'
      ? newsletterError()
      : newsletterSuccess();
  };

  const onSubmit = useCallback(async (subscription: NewSubscription) => {
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
  }, []);

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
        I'm okay with Mozilla handling my info as explained in this <br />
        <a
          href="https://www.mozilla.org/en-US/privacy/websites/"
          rel="noopener noreferrer"
          target="_blank"
          className="u-primary-link"
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
            <h2>Get immersed in Hubs!</h2>
            <p>
              Sign up here to get updates on what is new with Hubs and we will
              keep you up to date with the latest {!isDesktopDown && <br />}{' '}
              news, updates, and product offerings. We can't wait to show you
              what we have been working on!
            </p>
          </div>

          <div className={styles.card_contents}>
            {/* IMAGE  */}
            {!isDesktopDown && (
              <div className={styles.card_image}>
                <Image width={440} src={donutMailMan} />
              </div>
            )}

            {/* FORM  */}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              {submitted ? (
                responseStatus ? (
                  <Success />
                ) : (
                  <Error />
                )
              ) : (
                <div className="flex-box">
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Input
                        type="email"
                        label="Email Address"
                        placeholder="name@email.com"
                        required={true}
                        classProp="margin-bottom-16"
                        {...field}
                      />
                    )}
                  />

                  {/* {radioFormOptions.map((option, i) => { */}
                  {/* return ( */}
                  <Controller
                    name="email_format"
                    control={control}
                    render={({ field: { onChange, value, ...props } }) => (
                      <>
                        <fieldset
                          id="sb_radio"
                          onChange={onChange}
                          className="margin-bottom-16"
                        >
                          <legend className={styles.form_legend}>Format</legend>
                          <div className="flex">
                            <RadioButton
                              groupValue={value}
                              label="HTML"
                              value="html"
                              id="html_id"
                              groupName="emailFormat"
                              {...props}
                            />
                            <RadioButton
                              groupValue={value}
                              label="Text"
                              value="text"
                              id="text_id"
                              groupName="emailFormat"
                              {...props}
                            />
                          </div>
                        </fieldset>
                      </>
                    )}
                  />

                  {/* CONFIRMATION CHECKBOX  */}
                  <Checkbox
                    classProp="u-content-box margin-left-13"
                    onChange={onConfirm}
                    checked={confirm}
                    label={<Label />}
                  />

                  <div className="padding-top-16">
                    <Button
                      label="submit"
                      type="submit"
                      disabled={!confirm}
                      text="Join the Mailing List"
                    />
                  </div>
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
