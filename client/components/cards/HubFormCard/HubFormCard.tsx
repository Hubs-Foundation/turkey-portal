import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './HubFormCard.module.scss';
import { HUB_ROOT_DOMAIN } from 'config';
import {
  Button,
  ButtonCategoriesE,
  ButtonSizesE,
  Icon,
  Input,
} from '@mozilla/lilypad';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { validateHubSubdomain } from 'services/hub.service';
import { StoreContext, SubdomainRetryT } from 'contexts/StoreProvider';
import { RoutesE } from 'types/Routes';

export type HubFormCardT = {
  name: string;
  subdomain: string;
  hubId: string;
};

type HubFormCardPropsT = {
  hub: HubFormCardT;
  onSubmit: Function;
  onError?: Function;
  classProp?: string;
};

export enum DomainErrorsE {
  SUBDOMAIN_TAKEN = 'subdomain_taken',
  SUBDOMAIN_DENIED = 'subdomain_denied',
}

const HubFormCard = ({
  hub,
  onSubmit,
  onError,
  classProp = '',
}: HubFormCardPropsT) => {
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
  const storeContext = useContext(StoreContext);
  const [isValidDomain, setIsValidDomain] = useState(true);
  const [domainValidationError, setDomainValidationError] =
    useState<string>('');
  const [isEditingDomain, setIsEditingDomain] = useState(false);

  const router = useRouter();
  // TODO - react hook form is always saying inputs are valid when they are not
  const {
    control,
    handleSubmit,
    formState: { isValid, errors, dirtyFields },
    getValues,
  } = useForm<HubFormCardT>({
    defaultValues: {
      name: hub.name,
      subdomain: hub.subdomain,
    },
  });

  /**
   * Submit Form
   * @param data
   */

  /**
   * Show a different error for when a subdomain
   * is already in use by another user, vs when a subdomain
   * is invalid or forbidden. The validate_subdomain API returns
   * either subdomain_taken or subdomain_denied.
   */
  const handleFormSubmit: SubmitHandler<HubFormCardT> = (data) => {
    // Domain does not pass serverside validation
    if (!isValidDomain) return;

    onSubmit && onSubmit(data);
    // Store away the last submitted subdomain incase we need to re-try.
    const subdomain: SubdomainRetryT = {
      subdomain: data.subdomain,
      hubId: hub.hubId,
    };
    storeContext.handleSubdomainChange(subdomain);
  };

  /**
   * Cancel Click ( Router )
   */
  const handleCancelClick = () => {
    router.push({
      pathname: RoutesE.Dashboard,
    });
  };

  /**
   * Handle Subdomain Input Blur
   */
  const handleOnBlur = (isValid: boolean | undefined) => {
    const newSubdomain = getValues('subdomain');

    // Data has not been edited
    if (hub.subdomain === newSubdomain) {
      setIsValidDomain(true);
      setIsEditingDomain(false);
      return;
    }

    if (!isValid) {
      setIsValidDomain(false);
      setIsEditingDomain(false);
      return;
    }

    // Validate subdomain
    validateHubSubdomain(hub.hubId, newSubdomain).then(({ error, success }) => {
      if (error) {
        switch (error) {
          case DomainErrorsE.SUBDOMAIN_TAKEN:
            setDomainValidationError('subdomain is taken');
            break;
          case DomainErrorsE.SUBDOMAIN_DENIED:
            setDomainValidationError('subdomain is denied');
            break;
        }
      }

      success && setDomainValidationError('');
      setIsValidDomain(success);
      setIsEditingDomain(false);
    });
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
            label="cancel form"
            onClick={handleCancelClick}
            size={ButtonSizesE.LARGE}
            category={ButtonCategoriesE.PRIMARY_CLEAR}
            icon="arrow-left"
            classProp="margin-right-5"
          />
          <h1 className={styles.title}>Hub Details</h1>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.form_contents}>
            {/* HUB NAME  */}
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  maxLength={24}
                  classProp="u-width-100"
                  label="Hub Name"
                  placeholder="Hub Name"
                  required={true}
                  info="Character Limit 24"
                  {...field}
                />
              )}
            />

            {/* HUB SUBDOMAIN / ADDRESS  */}
            <div className={styles.address_wrapper}>
              <Controller
                name="subdomain"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <Input
                      onBlur={(isValid: boolean) => {
                        handleOnBlur(isValid);
                        field.onBlur();
                      }}
                      ref={field.ref}
                      onFocus={handleOnFocus}
                      minLength={3}
                      maxLength={63}
                      classProp="margin-bottom-10"
                      placeholder="Web Address (URL)"
                      label="Web Address (URL)"
                      info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
                      pattern="[a-zA-Z0-9-]+"
                      validator={handleNameValidator}
                      customErrorMessage={addressErrorMessage}
                      required={true}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </>
                )}
              />
              <div className={styles.address_preview}>
                .{HUB_ROOT_DOMAIN}
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

            {/* Note: this error messaging is specific to domain serverside validation  */}
            {!isValidDomain && domainValidationError.length ? (
              <div className={styles.error_message}>
                Please enter another address, the {domainValidationError}.
              </div>
            ) : null}
          </div>

          <div className={styles.actions_wrapper}>
            <Button
              label="cancel form"
              classProp="margin-right-5"
              onClick={handleCancelClick}
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              text="Cancel"
            />

            <Button
              label="submit form"
              type="submit"
              category={ButtonCategoriesE.PRIMARY_SOLID}
              text="update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default HubFormCard;
