import { useState, useCallback } from 'react';
import styles from './Banner.module.scss';
import { useForm, Controller } from 'react-hook-form';
import {
  Checkbox,
  Input,
  RadioButton,
  Button,
  IconT,
  Icon,
  ButtonCategoriesE,
} from '@mozilla/lilypad';
import Image from 'next/image';
import axios from 'axios';
import qs from 'qs';
import Success from './Success/Success';
import Error from './Error/Error';

type NewSubscription = {
  email: string;
  email_format: string;
};

type SubscribeResponse = {
  status: number;
  statusText: string;
};

/**
 * For more information about the subsription API go basket documentation
 * https://basket.readthedocs.io/newsletter_api.html#news-subscribe
 */
const Banner = () => {
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { control, handleSubmit, register } = useForm<NewSubscription>({
    defaultValues: {
      email_format: 'html',
    },
  });

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
   * @param {Basket Response} resp
   * @returns
   */
  const handleResponse = (resp: SubscribeResponse) => {
    const { status, statusText } = resp;

    if (status !== 200) {
      newsletterError();
      return;
    }

    if (statusText !== 'OK') {
      newsletterError();
      return;
    }

    // Do success stuff here..
    newsletterSuccess();
  };

  const onSubmit = useCallback(async (subscription: NewSubscription) => {
    const url = 'https://basket.mozilla.org/news/subscribe/';
    const { email, email_format } = subscription;
    const data = {
      email: email,
      format: email_format,
      newsletters: 'hubs',
      lang: navigator.language,
      source_url: window.location.origin,
    };
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
      url,
    };

    try {
      axios(options).then(handleResponse);
    } catch (error) {
      console.error(error);
      newsletterError();
    }
  }, []);

  /**
   * Emain input change
   */
  const onChangeEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );

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
        I&apos;m okay with Mozilla handling my info as explained in this{' '}
        <a
          href="https://www.mozilla.org/en-US/privacy/websites/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Notice
        </a>
      </>
    );
  };

  return (
    <>
      <div className={styles.banner_gradient} />
      <div className={styles.banner_wrapper}>
        <div className={styles.banner_container}>
          {/* BRANDING  */}
          <div className={styles.branding_container}>
            <h2>Join the next evolution of Hubs!</h2>
            <p>Be the first to get a sneak peek!</p>
          </div>

          <Button
            label="Find out More"
            classProp={styles.primary_override}
            text="Find out More"
            icon="chevron-down"
            onClick={() => {
              setIsExpanded(true);
            }}
          />
        </div>

        {/* EXPAND CONTAINER  */}
        {isExpanded ? (
          <div className={styles.expand_wrapper}>
            <div className={styles.expand_container}>
              <div className={styles.expand_header}>
                <h2>Join the next evolution of Hubs!</h2>
                <Button
                  label="close"
                  icon="x"
                  classProp={styles.close_button}
                  onClick={() => {
                    setIsExpanded(false);
                  }}
                />
              </div>

              <div className={styles.expand_contents}>
                {/* MESSAGING  */}
                <div className={styles.expand_messaging}>
                  <p>
                    We're working on a new service that makes it easier than
                    ever to deploy a Hub of your own.
                  </p>

                  <p>
                    Sign up here to get updates on what is new with Hubs and we
                    will keep you up to date with the latest news, updates, and
                    product offerings. We can't wait to show you what we have
                    been working on!
                  </p>
                </div>

                {/* FORM  */}
                <form
                  className={styles.expand_form}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {submitted ? (
                    responseStatus ? (
                      <Success />
                    ) : (
                      <Error />
                    )
                  ) : (
                    <div className={styles.expand_form_fields}>
                      {/* <TextInputField
                        ref={register}
                        name="email"
                        type="email"
                        label={
                          <FormattedMessage
                            id="banner.email-address"
                            defaultMessage="Email Address"
                          />
                        }
                        required
                        value={email}
                        onChange={onChangeEmail}
                        placeholder="name@email.com"
                        className={styles.expand_form_field}
                      /> */}

                      <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Input
                            type="email"
                            maxLength={24}
                            classProp="u-width-100"
                            label="Email Address"
                            placeholder="name@email.com"
                            required={true}
                            info="Character Limit 24"
                            {...field}
                          />
                        )}
                      />

                      {/* 
                      <RadioInputField
                        className={styles.expand_form_field}
                        label={
                          <FormattedMessage
                            id="banner.format-label"
                            defaultMessage="Format"
                          />
                        }
                      >
                        <RadioInputOption
                          className={styles.radio_override}
                          name="email_format"
                          value="html"
                          label={
                            <FormattedMessage
                              id="banner.format-html"
                              defaultMessage="HTML"
                            />
                          }
                          ref={register}
                        />
                        <RadioInputOption
                          className={styles.radio_override}
                          name="email_format"
                          value="text"
                          label={
                            <FormattedMessage
                              id="banner.format-text"
                              defaultMessage="Text"
                            />
                          }
                          ref={register}
                        />
                      </RadioInputField> */}
                      {/* 
                      <CheckboxInput
                        className={styles.expand_checkbox_field}
                        labelClassName={styles.checkbox_label}
                        tabIndex="0"
                        type="checkbox"
                        checked={confirm}
                        label={<Label />}
                        onChange={onConfirm}
                      /> */}

                      <Checkbox
                        onChange={onConfirm}
                        checked={confirm}
                        label={<Label />}
                      />

                      <div className={styles.expand_actions}>
                        <Button
                          label="submit"
                          type="submit"
                          disabled={!confirm}
                          text="Join the Mailing List"
                        />

                        <Button
                          label="Not Interested"
                          category={ButtonCategoriesE.PRIMARY_CLEAR}
                          text="Not Interested"
                          onClick={() => {
                            setIsExpanded(false);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
};

export default Banner;
