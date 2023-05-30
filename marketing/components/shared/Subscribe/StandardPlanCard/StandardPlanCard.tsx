import getEnvVariable from 'config';
import { useCallback, useEffect, useState } from 'react';
import { getRegion } from 'services/region.service';
import { CountriesE, RegionCodeT } from 'types/Countries';
import { BasePlanCard, Price } from '../BasePlanCard/BasePlanCard';
import { standardPlanInfoCopy } from '../BasePlanCard/planInfoCopy';
import { Button, Checkbox } from '@mozilla/lilypad-ui';

const TAX_REGIONS: RegionCodeT[] = ['US'];

const StandardPlanCard = () => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  // TODO : set up the store and add region to it.
  const [regionCode, setRegionCode] = useState<RegionCodeT>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
        setRegionCode(data.regionCode);
      } catch (e) {
        console.error(e);
        setRegionCode(null);
      }
    };
    fetchRegion();
  }, []);

  /**
   * Check If Euro Region or not
   * @return Boolean
   */
  const isEuro = useCallback((): boolean => {
    return Boolean(regionCode === CountriesE.GERMANY);
  }, [regionCode]);

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = useCallback(() => {
    // Default to US plan
    const plan: string = isEuro()
      ? getEnvVariable('PLAN_ID_EA_DE')
      : getEnvVariable('PLAN_ID_EA');
    const url = `${getEnvVariable('FXA_PAYMENT_URL')}/checkout/${getEnvVariable(
      'PRODUCT_ID'
    )}?plan=${plan}`;
    window.open(url);
  }, [isEuro]);

  const onToggleConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
  }, []);

  const hasTax = TAX_REGIONS.includes(regionCode);

  return (
    <BasePlanCard
      title="Early Access Hub"
      color="warm"
      price={
        <Price
          regionCode={regionCode}
          price="20"
          priceCadence={`per month${hasTax ? ' + tax' : ''}`}
        />
      }
      infoCopyList={standardPlanInfoCopy}
      form={
        <form className="content-box mt-16 mb-16">
          <Checkbox
            classProp="content-box"
            onChange={onToggleConfirmation}
            checked={locationConfirmed}
            label="I'm located in UK, Canada, USA, or Germany"
          />
        </form>
      }
      confirmButton={
        <Button
          label="Subscribe to hubs"
          text="Subscribe"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      }
    />
  );
};

export default StandardPlanCard;
