import { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox } from '@mozilla/lilypad-ui';
import { StandardPlanInfoCopy } from './PlanInfoCopy';
import { CountriesE, RegionsT } from 'types/Countries';
import { getRegion, RegionObjT } from 'services/region.service';
import { Price, BasePlanCard } from './BasePlanCard';
import { enabledStarterPlan } from 'util/featureFlag';
import { getRegionPricePageUrl } from 'util/regionUtils';

const TAX_REGIONS: RegionsT[] = ['US'];

export const StandardPlanCard = () => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
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

  /**
   * Check If Euro Region or not
   * @return Boolean
   */
  const isEuro = useCallback((): boolean => {
    return Boolean(region && region.toUpperCase() === CountriesE.GERMANY);
  }, [region]);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    const url = getRegionPricePageUrl('EA', region);
    window.open(url);
  }, [region]);

  const onToggleLocationConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  const hasTax = TAX_REGIONS.includes(region);

  return (
    <BasePlanCard
      title={'Early Access Hub'}
      color="warm"
      price={
        <Price
          price="20"
          region={region as RegionsT}
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
