import { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox } from '@mozilla/lilypad-ui';
import { StandardPlanInfoCopy } from '../PlanInfoCopy';
import { RegionCodeT } from 'types/Countries';
import BasePlanCard, { Price } from './BasePlanCard';
import { getRegionPricePageUrl } from 'util/utilities';
import { useSelector } from 'react-redux';
import { selectRegion } from 'store/regionSlice';

const TAX_REGIONS: RegionCodeT[] = ['US'];
const StandardPlanCard = () => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  const { regionCode } = useSelector(selectRegion);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    const url = getRegionPricePageUrl(regionCode);
    window.open(url);
  }, [regionCode]);

  const onToggleLocationConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  const hasTax = TAX_REGIONS.includes(regionCode);

  return (
    <BasePlanCard
      // isSoldOut={true}
      title={'Early Access Hub'}
      color="warm"
      price={
        <Price
          price="20"
          region={regionCode}
          priceCadence={`per month${hasTax ? ' + tax' : ''}`}
        />
      }
      infoCopyList={StandardPlanInfoCopy}
      form={
        <form className="content-box mt-16 mb-16">
          <Checkbox
            classProp="content-box"
            onChange={onToggleLocationConfirmation}
            checked={locationConfirmed}
            label="I'm located in UK, Canada, USA, or Germany"
          />
        </form>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe now"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      }
    />
  );
};

export default StandardPlanCard;
