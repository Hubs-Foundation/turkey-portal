import { Button, ButtonCategoriesE } from '@mozilla/lilypad-ui';
import styles from './ContactCard.module.scss';

type ContactCardPropsT = {
  email: string;
  subject: string;
  classProp?: string;
};

const ContactCard = ({ email, subject, classProp = '' }: ContactCardPropsT) => {
  const handleContactClick = () => {
    window.open(`mailto:${email}?subject=${encodeURI(subject)}`);
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        <h2>Business</h2>
        <p>Need dedicated infrastructure, custom clients, or something else?</p>
        <Button
          label="contact us"
          text="Contact us"
          onClick={handleContactClick}
          category={ButtonCategoriesE.SECONDARY_SOLID}
        />
      </div>
    </div>
  );
};

export default ContactCard;
