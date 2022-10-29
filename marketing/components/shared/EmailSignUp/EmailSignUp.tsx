import { useState, useCallback } from 'react';
import styles from './EmailSignUp.module.scss';
import { useForm, Controller } from 'react-hook-form';
import {
  Checkbox,
  Input,
  RadioButton,
  Button,
  ButtonCategoriesE,
} from '@mozilla/lilypad';
import Image from 'next/image';
import axios from 'axios';
import qs from 'qs';
import Success from './Success/Success';
import Error from './Error/Error';
// Assets
import donutMailMan from '../../../public/donut_mail_man.jpg';

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
const EmailSignUp = () => {
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [responseStatus, setResponseStatus] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { control, handleSubmit, register } = useForm<NewSubscription>({
    defaultValues: {
      email_format: 'text',
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
    console.log('subscription', subscription);
    // const url = 'https://basket.mozilla.org/news/subscribe/';
    // const { email, email_format } = subscription;
    // const data = {
    //   email: email,
    //   format: email_format,
    //   newsletters: 'hubs',
    //   lang: navigator.language,
    //   source_url: window.location.origin,
    // };
    // const options = {
    //   method: 'POST',
    //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //   data: qs.stringify(data),
    //   url,
    // };

    // try {
    //   axios(options).then(handleResponse);
    // } catch (error) {
    //   console.error(error);
    //   newsletterError();
    // }
  }, []);

  const radioFormOptions = [
    {
      label: 'html',
      value: 'html',
      groupName: 'example',
      id: 'label_1',
    },
    {
      label: 'text',
      value: 'text',
      groupName: 'example',
      id: 'label_2',
    },
  ];

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
    <section className={styles.section_wrapper}>
      <div className={styles.swoosh}>
        <svg viewBox="0 70 500 60" preserveAspectRatio="none">
          <rect x="0" y="0" width="500" height="500" fill="transparent" />
          <path
            d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>

      <div className={styles.section_container}>
        <div className={styles.card_wrapper}>
          <div className={styles.card_header}>
            <h2>Get immersed in Hubs!</h2>
            <p>
              Sign up here to get updates on what is new with Hubs and we will
              keep you up to date with the latest <br /> news, updates, and
              product offerings. We can't wait to show you what we have been
              working on!
            </p>
          </div>

          <div className={styles.card_contents}>
            {/* IMAGE  */}
            <Image src={donutMailMan} />

            {/* FORM  */}
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
                        <fieldset id="sb_radio" onChange={onChange}>
                          <p>{value}</p>
                          <RadioButton
                            groupValue={value}
                            label="text"
                            value="text"
                            id="text_id"
                            groupName="emailFormat"
                            {...props}
                          />
                          <RadioButton
                            groupValue={value}
                            label="html"
                            value="html"
                            id="html_id"
                            groupName="emailFormat"
                            {...props}
                          />
                        </fieldset>
                      </>
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
