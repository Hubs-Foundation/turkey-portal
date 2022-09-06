import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import styles from './SubContactCard.module.scss';

type SubContactCardPropsT = {
  email: string;
  subject: string;
  classProp?: string;
};

const SubContactCard = ({
  email,
  subject,
  classProp = '',
}: SubContactCardPropsT) => {
  const handleContactClick = () => {
    window.location.href = `mailto:${email}?subject=${subject}`;
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        <h2>Business</h2>
        <p>Need dedicated infrastructure, custom clients, or something else?</p>
        <Button
          text="Contact us"
          onClick={handleContactClick}
          category={ButtonCategoriesE.SECONDARY_SOLID}
        />
      </div>
    </div>
  );
};

export default SubContactCard;
