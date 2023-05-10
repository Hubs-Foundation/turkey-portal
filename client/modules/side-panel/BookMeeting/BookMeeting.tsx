import styles from './BookMeeting.module.scss';
import Card from '@Shared/Card/Card';
import { Button } from '@mozilla/lilypad-ui';

const BookMeeting = () => {
  return (
    <Card classProp="mb-16">
      <div className={styles.wrapper}>
        <div className="mr-20-dt mr-12-mb">
          <p className="body-md">
            Grab a free, 30-minute call with a member of the Hubs team
          </p>
        </div>
        <div className="mt-12-mb">
          <Button
            classProp={styles.cta}
            text="Book Now"
            label="book meeting with team"
            target="_blank"
            href="https://calendly.com/mhmorran/onboarding "
          />
        </div>
      </div>
    </Card>
  );
};

export default BookMeeting;
