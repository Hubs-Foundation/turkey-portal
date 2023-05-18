import styles from './UpgradePlan.module.scss';
import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import { useEffect, useState } from 'react';
import { RegionObjT, getRegion } from 'services/region.service';
import { RegionsT } from 'types/Countries';
import { getRegionPricePageUrl } from 'util/utilities';

const UpgradePlan = () => {
  const [region, setRegion] = useState<RegionsT>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data: RegionObjT = await getRegion();
        setRegion(data.region);
      } catch (e) {
        console.error(e);
        setRegion(null);
      }
    };
    fetchRegion();
  }, []);

  const url = getRegionPricePageUrl(region);

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
          href={url}
        />
      </div>
    </div>
  );
};

export default UpgradePlan;
