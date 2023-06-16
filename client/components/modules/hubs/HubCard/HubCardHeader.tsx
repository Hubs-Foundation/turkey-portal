import { Button, ButtonCategoriesE, Dropdown } from '@mozilla/lilypad-ui';
import { useRouter } from 'next/router';
import { RoutesE } from 'types/Routes';
import { StatusE } from 'types/General';
import styles from './HubCardHeader.module.scss';
import { useIsStarter, useIsProfessional } from 'hooks/usePlans';

type HubCardHeaderPropsT = {
  hubId: string;
  status: StatusE;
  classProp?: string;
};

const HubCardHeader = ({
  hubId,
  status,
  classProp = '',
}: HubCardHeaderPropsT) => {
  const router = useRouter();
  const isStarter = useIsStarter();
  const isProfessional = useIsProfessional();

  const DropdownContent = (
    <div className="dropdown_wrapper">
      <button
        className="dropdown-link"
        onClick={() => {
          router.push({
            pathname: RoutesE.HUBS,
            query: { hub_id: hubId },
          });
        }}
      >
        Edit Details
      </button>
      {isProfessional && (
        <button
          className="dropdown-link mt-14"
          onClick={() => {
            router.push({
              pathname: RoutesE.CUSTOM_CLIENT,
            });
          }}
        >
          Upload Custom Client
        </button>
      )}
    </div>
  );

  const dropdownVisible =
    !isStarter && status !== StatusE.CREATING && status !== StatusE.UPDATING;

  return (
    <div className={`${classProp} ${styles.card_header}`}>
      <div className={styles.card_status_wrapper}>
        <div
          className={`${styles.card_status}  ${
            styles['card_status_' + status]
          }`}
        ></div>
        <div className="ml-10 capitalize">{status}</div>
      </div>

      {/* Edit Hubs Details  */}
      {dropdownVisible && (
        <Dropdown
          alignment="right"
          width={210}
          cta={
            <Button
              icon="more-vertical"
              label="toggle"
              category={ButtonCategoriesE.PRIMARY_CLEAR}
            />
          }
          content={DropdownContent}
        />
      )}
    </div>
  );
};

export default HubCardHeader;
