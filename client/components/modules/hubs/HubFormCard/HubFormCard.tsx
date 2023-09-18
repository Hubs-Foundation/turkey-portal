import { useState, useContext, FocusEventHandler } from 'react';
import { useRouter } from 'next/router';
import styles from './HubFormCard.module.scss';
import { Button, Icon, Input, Pill } from '@mozilla/lilypad-ui';
import { validateHubSubdomain } from 'services/hub.service';
import { StoreContext, SubdomainRetryT } from 'contexts/StoreProvider';
import { RoutesE } from 'types/Routes';
import { useFormik } from 'formik';
import validate, { FormValues } from './validate';
import { useIsProfessional } from 'hooks/usePlans';

export type HubFormCardT = {
  domain: string;
  name: string;
  subdomain: string;
  hubId: string;
};

type HubFormCardPropsT = {
  hub: HubFormCardT;
  onSubmit: Function;
  classProp?: string;
};

export enum DomainErrorsE {
  SUBDOMAIN_TAKEN = 'subdomain_taken',
  SUBDOMAIN_DENIED = 'subdomain_denied',
}

const HubFormCard = ({ hub, onSubmit, classProp = '' }: HubFormCardPropsT) => {
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
  const storeContext = useContext(StoreContext);
  const [isValidDomain, setIsValidDomain] = useState(true);
  const [domainValidationError, setDomainValidationError] =
    useState<string>('');
  const [isEditingDomain, setIsEditingDomain] = useState(false);
  const router = useRouter();
  const isProfessional = useIsProfessional();

  /**
   * Init Formik
   */
  const formik = useFormik({
    initialValues: {
      subdomain: hub.subdomain,
    },
    validate,
    onSubmit: (data: FormValues) => {
      // Domain does not pass serverside validation
      if (!isValidDomain) return;

      onSubmit && onSubmit(data);
      // Store away the last submitted subdomain incase we need to re-try.
      const subdomain: SubdomainRetryT = {
        subdomain: data.subdomain,
        hubId: hub.hubId,
      };
      storeContext.handleSubdomainChange(subdomain);
    },
  });

  /**
   * Cancel Click ( Router )
   */
  const handleCancelClick = () => {
    router.push({
      pathname: RoutesE.DASHBOARD,
    });
  };

  /**
   * Handle Subdomain Input Blur
   */
  const handleOnBlur = (event: FocusEventHandler) => {
    formik.handleBlur(event);
    const { value, initialValue, error } = formik.getFieldMeta('subdomain');

    // Data has not been edited
    if (value === initialValue) {
      setIsValidDomain(true);
      setIsEditingDomain(false);
      return;
    }

    if (error) {
      setIsValidDomain(false);
      setIsEditingDomain(false);
      return;
    }

    /**
     * Show a different error for when a subdomain
     * is already in use by another user, vs when a subdomain
     * is invalid or forbidden. The validate_subdomain API returns
     * either subdomain_taken or subdomain_denied.
     */
    const setValidation = async () => {
      try {
        // Validate subdomain
        const { error: validateError, success } = await validateHubSubdomain(
          hub.hubId,
          value
        );

        // On Error
        if (validateError) {
          switch (validateError) {
            case DomainErrorsE.SUBDOMAIN_TAKEN:
              setDomainValidationError('subdomain is taken');
              break;
            case DomainErrorsE.SUBDOMAIN_DENIED:
              setDomainValidationError('subdomain is denied');
              break;
          }
        }

        // On Success
        success && setDomainValidationError('');
        setIsValidDomain(success);
        setIsEditingDomain(false);
      } catch (error) {
        console.error(error);
      }
    };

    setValidation();
  };

  /**
   * Handle domain input focus
   */
  const handleOnFocus = () => {
    setIsEditingDomain(true);
  };

  /**
   * Check if address start/end with (-)
   * @param value
   * @returns Boolean
   */
  const handleNameValidator = (value: string) => {
    if (value.startsWith('-') || value.endsWith('-')) {
      setAddressErrorMessage('Cannot start or end with a hyphen (-)');
      return false;
    }

    setAddressErrorMessage('');
    return true;
  };

  const Warning = () => (
    <div className={styles.warning}>
      <div className="flex-align-center mb-12">
        <Icon name="alert-triangle" classProp="flex-shrink-0 mr-12" />
        <h3>Be Advised</h3>
      </div>
      <p className="mb-24">
        Due to temporary system instability, customizing a subdomain or
        connecting a custom domain may impact Spoke and the Admin panel. If you
        experience any issues with these features, please contact us.
      </p>

      <div className="flex-justify-end ">
        <Button
          onClick={() => {
            window.open('mailto:hubs-feedback@mozilla.com');
          }}
          text="Contact"
        />
      </div>
    </div>
  );

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <Button
            label="cancel"
            onClick={handleCancelClick}
            size="large"
            category="primary_clear"
            icon="arrow-left"
            classProp="mr-5"
          />
          <h1 className={styles.title}>Hub Details</h1>
        </div>

        <Warning />

        <form onSubmit={formik.handleSubmit}>
          <div className={styles.form_contents}>
            <div className={styles.address_wrapper}>
              <Input
                id="subdomain"
                onChange={formik.handleChange}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                value={formik.values.subdomain}
                minLength={3}
                maxLength={63}
                name="subdomain"
                classProp="margin-bottom-10"
                placeholder="Web Address (URL)"
                label="Web Address (URL)"
                info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
                pattern="[a-zA-Z0-9-]+"
                validator={handleNameValidator}
                customErrorMessage={addressErrorMessage}
                required={true}
              />
              <div className={styles.address_preview}>
                .{hub.domain}
                <div className={styles.icon_wrapper}>
                  {!isEditingDomain && (
                    <div className={styles.icon_container}>
                      {isValidDomain ? (
                        <Icon
                          name="check-circle"
                          classProp={styles.check_icon}
                        />
                      ) : (
                        <Icon
                          name="alert-triangle"
                          classProp={styles.error_icon}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!isValidDomain && domainValidationError.length ? (
              <div className={styles.error_message}>
                Please enter another address, the {domainValidationError}.
              </div>
            ) : null}
          </div>

          {isProfessional && (
            <section className={styles.custom_client_message}>
              <div className="flex-justify-between mb-12">
                <h1 className="heading-sm">Custom Domain</h1>
                <Pill title="Beta" category="cool" />
              </div>
              <p className="paragraph mb-24">
                This plan allows you to manually connect a custom domain to your
                hub using the command line. The following documentation walks
                you through the process, prerequisites, and how to
                troubleshooting custom domains.
              </p>

              <div className="mb-20 youtube-video">
                <iframe
                  src="https://www.youtube.com/embed/0PTmHNKdZB0"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>

              <a
                className="primary-link"
                rel="noreferrer"
                href="https://hubs.mozilla.com/docs/setup-custom-domain.html"
                target="_blank"
              >
                Custom Domain Documentation
              </a>
            </section>
          )}

          <section className={styles.actions_wrapper}>
            <Button
              label="cancel"
              classProp="mr-5"
              onClick={handleCancelClick}
              category="primary_clear"
              text="Cancel"
            />

            <Button
              label="Apply Changes"
              type="submit"
              category="primary_solid"
              text="Apply Changes"
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default HubFormCard;
