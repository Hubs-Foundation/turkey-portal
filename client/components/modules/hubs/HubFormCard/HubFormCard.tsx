import { useState, useContext, FocusEventHandler } from 'react';
import { useRouter } from 'next/router';
import styles from './HubFormCard.module.scss';
import {
  Button,
  ButtonCategoriesE,
  ButtonSizesE,
  Icon,
  Input,
  Pill,
} from '@mozilla/lilypad-ui';
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

  return (
    <div className={`${styles.card_wrapper} ${classProp}`}>
      <div className={styles.card_container}>
        <div className={styles.card_header}>
          <Button
            label="cancel"
            onClick={handleCancelClick}
            size={ButtonSizesE.LARGE}
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            icon="arrow-left"
            classProp="mr-5"
          />
          <h1 className={styles.title}>Hub Details</h1>
        </div>

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
                <h1 className="heading-sm">Custom Client</h1>
                <Pill title="Beta" category="cool" />
              </div>
              <p className="paragraph mb-24">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lacinia quis vel eros donec ac. Ultrices gravida dictum fusce
                ut. Dui accumsan sit amet nulla facilisi morbi tempus. Tellus
                integer feugiat scelerisque varius morbi enim nunc faucibus.
              </p>

              <a
                className="primary-link"
                onClick={() => {
                  window.open('mailto:hubs-clientupload@mozilla.com');
                }}
              >
                hubs-clientupload@mozilla.com
              </a>
            </section>
          )}

          <section className={styles.actions_wrapper}>
            <Button
              label="cancel"
              classProp="mr-5"
              onClick={handleCancelClick}
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              text="Cancel"
            />

            <Button
              label="update"
              type="submit"
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text="update"
            />
          </section>
        </form>
      </div>
    </div>
  );
};

export default HubFormCard;
