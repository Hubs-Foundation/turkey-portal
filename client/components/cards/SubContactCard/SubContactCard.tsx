import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import styles from './SubContactCard.module.scss';

type SubContactCardPropsT = {
  classProp?: string;
};

const SubContactCard = ({ classProp = '' }: SubContactCardPropsT) => {
  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        <h2>Business</h2>
        <p>Need dedicated infrastructure, custom clients, or something else?</p>
        <Button
          text="Contact us"
          href="mailto:hubs@mozilla.com?subject=Subscription inquiries"
          category={ButtonCategoriesE.SECONDARY_SOLID}
        />
      </div>
    </div>
  );
};

export default SubContactCard;
