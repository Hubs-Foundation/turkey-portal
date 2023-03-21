import { useCallback, useEffect, useState } from 'react';
import { Button, Checkbox } from '@mozilla/lilypad-ui';
import { StandardPlanInfoCopy } from './PlanInfoCopy';
import { FXA_PAYMENT_URL, PRODUCT_ID, PLAN_ID_EA, PLAN_ID_EA_DE } from 'config';
import { CountriesE, RegionsT } from 'types/Countries';
import { getRegion, RegionT, RegionObjT } from 'services/region.service';
import { Price, PlanInfoCard } from './PlanInfoCard';

const TAX_REGIONS: RegionT[] = ['US'];

export const StandardInfoCard = () => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  const [region, setRegion] = useState<RegionT>(null);

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
    // Default to US plan
    const plan: string = isEuro() ? PLAN_ID_EA_DE : PLAN_ID_EA;
    const url = `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${plan}`;
    window.open(url);
  }, [isEuro]);

  const onToggleLocationConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  const hasTax = TAX_REGIONS.includes(region);

  return (
    <PlanInfoCard
      title="Standard"
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
