import styles from './UpgradePlan.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { FXA_PAYMENT_URL, PRODUCT_ID, PLAN_ID_EA } from 'config';

const UpgradePlan = () => {
  return (
    <div className={styles.upgrade_container}>
      <div className="mr-20-dt mr-12-mb">
        <p className="body-md">Ready to take your hub to the next level?</p>
        <p className="body-md">
          Upgrade for a custom subdomain, more storage, and increased user
          capacity.
        </p>
      </div>
      <div className="mt-12-mb">
        {/* TODO add region functionality here - RKW */}
        <Button
          category={ButtonCategoriesE.SECONDARY_SOLID}
          text="Upgrade"
          label="Upgrade"
          href={`${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${PLAN_ID_EA}`}
        />
      </div>
    </div>
  );
};

export default UpgradePlan;
