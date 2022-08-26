import { Button, ButtonCategoriesE } from '@mozilla/lilypad';
import styles from './SubContactCard.module.scss';

type SubContactCardPropsT = {
  classProp?: string;
};

const SubContactCard = ({ classProp = '' }: SubContactCardPropsT) => {
  const handleContactClick = () => {
    //TODO set up contact mail to here. Get contact email from jira
    console.log('contact mail to pop up!');
  };

  return (
    <div className={`${styles.wrapper} ${classProp}`}>
      <div className={styles.content}>
        <h2>Business</h2>
        <p>Need dedicated infrastructure, custom clients, or something else?</p>
        <Button text="Contact us" onClick={handleContactClick} category={ButtonCategoriesE.SECONDARY_SOLID}/>
      </div>
    </div>
  );
};

export default SubContactCard;
