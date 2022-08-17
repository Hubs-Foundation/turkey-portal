import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import styles from './HubFormCard.module.scss';
import { HUB_ROOT_DOMAIN } from 'config';
import {
  Input,
  Button,
  ButtonCategoriesE,
  ButtonSizesE,
  Icon,
} from '@mozilla/lilypad';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { validateHubSubdomain } from 'services/hub.service';
import { StoreContext, SubdomainRetryT } from 'contexts/StoreProvider';

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

const HubFormCard = ({
  hub,
  onSubmit,
  onError,
  classProp = '',
}: HubFormCardPropsT) => {
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
  const storeContext = useContext(StoreContext);
  const [isValidDomain, setIsValidDomain] = useState(true);
  const [isEditingDomain, setIsEditingDomain] = useState(false);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { isValid },
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
  const handleFormSubmit: SubmitHandler<HubFormCardT> = (data) => {
    // Form Invalid
    if (!isValid) {
      onError && onError('Please fix form errors to continue.');
      return;
    }

    // Domain does not pass serverside validation
    if (!isValidDomain) {
      onError && onError('Please provide a valid domain to continue');
      return;
    }

    onSubmit && onSubmit(data);
    // Store away the last submitted subdomain incase we need to re-try.
    const subdomain: SubdomainRetryT = {
      subdomain: data.subdomain,
      hubId: hub.hubId,
    };
    storeContext.handleThemeChange(subdomain);
  };

  /**
   * Cancel Click ( Router )
   */
  const handleCancelClick = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  /**
   * Handle Subdomain Input Blur
   */
  const handleOnBlur = () => {
    const newSubdomain = getValues('subdomain');

    // Data has not been edited
    if (hub.subdomain === newSubdomain) {
      setIsValidDomain(true);
      setIsEditingDomain(false);
      return;
    }

    // Validate subdomain
    validateHubSubdomain(hub.hubId, newSubdomain).then((resp) => {
      setIsValidDomain(resp.success);
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
              {/* TODO: FOLLOW UP WITH UX ON HOW WE WANT TO HANDLE MAX LENGHT  */}
              <Controller
                name="subdomain"
                control={control}
                render={({ field }) => (
                  <Input
                    onBlur={handleOnBlur}
                    onFocus={handleOnFocus}
                    minLength={3}
                    maxLength={64}
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
          </div>

          <div className={styles.actions_wrapper}>
            <Button
              classProp="margin-right-5"
              onClick={handleCancelClick}
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              text="Cancel"
            />

            <Button
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
