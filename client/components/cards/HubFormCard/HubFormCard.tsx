import { useState } from 'react';
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

export type HubFormCardT = {
  name: string;
  subdomain: string;
};

type HubFormCardPropsT = {
  hub: HubFormCardT;
  onSubmit: Function;
  classProp?: string;
};

const HubFormCard = ({ hub, onSubmit, classProp = '' }: HubFormCardPropsT) => {
  const [addressErrorMessage, setAddressErrorMessage] = useState<string>('');
  const router = useRouter();
  const { control, handleSubmit } = useForm<HubFormCardT>({
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
    onSubmit && onSubmit(data);
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
          <h1 className={styles.title}>Hub Detials</h1>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.form_contents}>
            {/* HUB NAME  */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  classProp="u-width-100"
                  label="Hub Name"
                  placeholder="Hub Name"
                  required={true}
                  info="For use within the dashboard and accounts area"
                  {...field}
                />
              )}
            />

            {/* HUB SUBDOMAIN / ADDRESS  */}
            <div className={styles.address_wrapper}>
              <Controller
                name="subdomain"
                control={control}
                render={({ field }) => (
                  <Input
                    classProp="margin-bottom-10"
                    placeholder="Web Address (URL)"
                    label="Web Address (URL)"
                    info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
                    pattern="[a-zA-Z0-9-]+"
                    validator={handleNameValidator}
                    customErrorMessage={addressErrorMessage}
                    required={true}
                    {...field}
                  />
                )}
              />
              <div className={styles.address_preview}>
                .{HUB_ROOT_DOMAIN}
                <Icon name="check-circle" classProp={styles.check_icon} />
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
