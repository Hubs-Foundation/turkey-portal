import styles from './UpgradePlan.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { getRegionPricePageUrl } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';

const UpgradePlan = () => {
  const { code } = useSelector(selectRegion);

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
        <Button
          category={ButtonCategoriesE.SECONDARY_SOLID}
          text="Upgrade"
          label="Upgrade"
          href={getRegionPricePageUrl(code)}
        />
      </div>
    </div>
  );
};

export default UpgradePlan;
