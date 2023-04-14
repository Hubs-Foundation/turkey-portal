import { useCallback, useEffect, useState } from 'react';
import { Button, HubIcon, HubIconT, Checkbox } from '@mozilla/lilypad-ui';
import SubscriptionInfoCopy from './SubscriptionInfoCopy';
import styles from './SubInfoCard.module.scss';
import getEnvVariable from 'config';
import { RegionsT } from 'types';
import { getCurrencyMeta } from 'util/utilities';
import { getRegion } from 'services/region.service';

export enum CountriesE {
  GERMANY = 'DE',
}

type SubInfoCardPropsT = {
  classProp?: string;
};

type InfoBlockPropsT = {
  icon: HubIconT;
  label: string;
  description: string;
};

// INFO BLOCK COMPONENT
const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div className="flex-box">
        <HubIcon name={icon} size={30} classProp="mr-20 mt-2 " />
      </div>
      <div className="body-md">
        <p>
          <span className="body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};

// PRICE DISPLAY COMPONENT
type PricePropsT = {
  region: RegionsT;
};

const Price = ({ region }: PricePropsT) => {
  const currency = getCurrencyMeta(region);

  return (
    <>
      <h2 className="heading-lg mr-4">{currency.symbol}20</h2>
      <p className="body-md">{currency.abbrev}</p>
    </>
  );
};
const SubInfoCard = ({ classProp = '' }: SubInfoCardPropsT) => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);
  const [region, setRegion] = useState<string | null>(null);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        const data = await getRegion();
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

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.banner_gradient} />

      {/* HEADER  */}
      <h2 className={styles.title}>Early Access Hub</h2>

      <div className={styles.container}>
        {/* PRICE */}
        <div className={styles.price_wrapper}>
          <div className={styles.price_container}>
            <div className={styles.price}>
              <Price region={region as RegionsT} />
            </div>
            <p className={styles.price_cadence}>per month + tax</p>
          </div>
        </div>

        {/* CONTENT  */}
        <div>
          {SubscriptionInfoCopy.map(({ label, description, icon }, i) => {
            return (
              <InfoBlock
                key={i}
                icon={icon}
                label={label}
                description={description}
              />
            );
          })}

          {/* LOCATION CONFIRMATION  */}
          <form className="content-box mt-16 mb-16">
            <Checkbox
              classProp="content-box"
              onChange={onToggleConfirmation}
              checked={locationConfirmed}
              label="I'm located in UK, Canada, USA, or Germany"
            />
          </form>
        </div>
      </div>

      {/* FOOTER  */}
      <div className={styles.footer}>
        <Button
          label="Subscribe to hubs"
          text="Subscribe"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      </div>
    </div>
  );
};

export default SubInfoCard;
