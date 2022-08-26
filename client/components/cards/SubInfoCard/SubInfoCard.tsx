import { Button, Icon, IconT } from '@mozilla/lilypad';
import SubscriptionInfoCopy from './SubscriptionInfoCopy';
import styles from './SubInfoCard.module.scss';

type SubInfoCardPropsT = {
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

const SubInfoCard = ({ classProp = '' }: SubInfoCardPropsT) => {
  const handleSubscribeClick = () => {
    // TODO set up subscribe route here...
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
              <h2>$20</h2>
              <p>USD</p>
            </div>
            <p className={styles.price_cadence}>per month</p>
          </div>
        </div>
      </div>

      {/* CONTENT  */}
      <div className={styles.content}>
        {SubscriptionInfoCopy.map(({ label, description, icon}, i) => {
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
