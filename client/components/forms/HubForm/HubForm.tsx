import { useRouter } from 'next/router';
import styles from './HubForm.module.scss';
import { TierT } from 'types/General';
import { HUB_ROOT_DOMAIN } from 'config';
import Button from '@Shared/Button/Button';
import Input from '@Shared/Input/Input';
import 'react-toastify/dist/ReactToastify.css';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ButtonCategoriesE } from 'types/Form';
import HubOption from '@Forms/HubOption/HubOption';

export type HubFormT = {
  name: string;
  subdomain: string;
  tier: TierT;
};

export type HubGroupOptionT = {
  value: number | string;
  users: number;
  size: string;
  labelCategory: 'primary' | 'secondary';
  id: string;
  label: string;
  groupName: string;
};

type HubDetailsViewPropsT = {
  hub: HubFormT;
  onSubmit: Function;
};

const HubForm = ({ hub, onSubmit }: HubDetailsViewPropsT) => {
  const router = useRouter();
  const { control, handleSubmit, watch } = useForm<HubFormT>({
    defaultValues: {
      name: hub.name,
      subdomain: hub.subdomain,
      tier: hub.tier,
    },
  });
  const watchSubdomain = watch('subdomain', hub.subdomain);

  const handleFormSubmit: SubmitHandler<HubFormT> = (data) => {
    onSubmit && onSubmit(data);
  };

  const handleCancelClick = () => {
    router.push({
      pathname: '/dashboard',
    });
  };

  // Mock Data
  const radioFormOptions: HubGroupOptionT[] = [
    {
      label: 'Free',
      labelCategory: 'primary',
      value: 'free',
      size: '250MB',
      users: 5,
      groupName: 'tier',
      id: 'freeOption',
    },
    {
      label: 'MVP 2',
      labelCategory: 'secondary',
      value: 'mvp',
      size: '2GB',
      users: 25,
      groupName: 'tier',
      id: 'mvpOption',
    },
  ];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* HUB NAME  */}
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input label="Hub Name" required={true} {...field} />
        )}
      />

      {/* HUB TIER  */}
      <Controller
        name="tier"
        control={control}
        render={({ field }) => (
          <fieldset id="tier" {...field}>
            {radioFormOptions.map((option) => {
              return (
                <HubOption
                  checked={option.value === field.value}
                  key={option.id}
                  label={option.label}
                  labelCategory={option.labelCategory}
                  size={option.size}
                  users={option.users}
                  groupName={option.groupName}
                  id={option.id}
                  value={option.value}
                />
              );
            })}
          </fieldset>
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
              label="Web Address (URL)"
              info="Supports letters (a to z), digits (0 to 9), and hyphens (-)"
              required={true}
              {...field}
            />
          )}
        />
        <div className={styles.address_preview}>
          <b>{watchSubdomain}</b>.{HUB_ROOT_DOMAIN}
        </div>
      </div>

      <div className={styles.actions_wrapper}>
        <Button
          onClick={handleCancelClick}
          category={ButtonCategoriesE.PRIMARY_OUTLINE}
          text="Back"
        />

        <Button
          type="submit"
          category={ButtonCategoriesE.PRIMARY_SOLID}
          text="Submit"
        />
      </div>
    </form>
  );
};

export default HubForm;
