import { useCallback, useState } from 'react';
import { Button, Icon, IconT, Checkbox } from '@mozilla/lilypad';
import SubscriptionInfoCopy from './SubscriptionInfoCopy';
import styles from './SubInfoCard.module.scss';
import { FXA_PAYMENT_URL, PRODUCT_ID, PLAN_ID_EA } from 'config';

type SubInfoCardPropsT = {
  classProp?: string;
};

type InfoBlockPropsT = {
  icon: IconT;
  label: string;
  description: string;
};

// INFO BLOCK COMPONENT
const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div>
        <Icon name={icon} size={30} classProp="margin-right-20 margin-top-2 " />
      </div>
      <div className="u-body-md">
        <p>
          {' '}
          <span className="u-body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};

const SubInfoCard = ({ classProp = '' }: SubInfoCardPropsT) => {
  const [locationConfirmed, setLocationConfirmed] = useState<boolean>(false);

  const handleSubscribeClick = useCallback(() => {
    window.open(`${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${PLAN_ID_EA}`);
  }, []);

  const onToggleConfirmation = useCallback((value: boolean) => {
    setLocationConfirmed(value);
    console.log('value', value);
  }, []);

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.banner_gradient} />

      {/* HEADER  */}
      <div>
        <h2 className={styles.title}>Early Access Hub</h2>
        <div className={styles.price_wrapper}>
          <div className={styles.price_container}>
            <div className={styles.price}>
              {/* TODO pull price and currency from subplat here  */}
              <h2>$20</h2>
              <p>USD</p>
            </div>
            <p className={styles.price_cadence}>per month</p>
          </div>
        </div>
      </div>

      {/* CONTENT  */}
      <div className={styles.content}>
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
      </div>

      {/* LOCATION CONFIRMATION  */}
      <form className="u-content-box margin-top-16 margin-bottom-16">
        <Checkbox
          classProp="u-content-box"
          onChange={onToggleConfirmation}
          checked={locationConfirmed}
          label="I'm located in UK CAN USA or Germany"
        />
      </form>

      {/* FOOTER  */}
      <div className={styles.footer}>
        <Button
          text="Subscribe"
          onClick={handleSubscribeClick}
          disabled={!locationConfirmed}
        />
      </div>
    </div>
  );
};

export default SubInfoCard;
