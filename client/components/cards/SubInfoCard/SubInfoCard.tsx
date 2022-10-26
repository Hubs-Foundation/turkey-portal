import { useRouter } from 'next/router';
import { Button, Icon, IconT } from '@mozilla/lilypad';
import SubscriptionInfoCopy from './SubscriptionInfoCopy';
import styles from './SubInfoCard.module.scss';
import { FXA_PAYMENT_URL, PRODUCT_ID, PLAN_ID_EA, EU_PLAN_ID_EA } from 'config';
import { CountriesE } from 'types/Countries';

type SubInfoCardPropsT = {
  region: string | null;
  classProp?: string;
};

type InfoBlockPropsT = {
  icon: IconT;
  label: string;
  description: string;
};

const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <Icon name={icon} size={20} classProp="margin-right-20 margin-top-2" />
      <div className="u-body-md">
        <p>
          {' '}
          <span className="u-body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};

const SubInfoCard = ({ region, classProp = '' }: SubInfoCardPropsT) => {
  const router = useRouter();

  /**
   * Handle routing user to correct payment plan
   */
  const handleSubscribeClick = () => {
    // Default to US plan
    let plan: string = PLAN_ID_EA;
    if (region && region.toUpperCase() === CountriesE.Germany) {
      plan = EU_PLAN_ID_EA;
    }
    const url = `${FXA_PAYMENT_URL}/checkout/${PRODUCT_ID}?plan=${plan}`;
    router.push(url);
  };

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

      {/* FOOTER  */}
      <div className={styles.footer}>
        <Button text="Subscribe" onClick={handleSubscribeClick} />
      </div>
    </div>
  );
};

export default SubInfoCard;
