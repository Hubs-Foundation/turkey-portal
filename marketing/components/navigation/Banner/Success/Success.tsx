import { useState } from 'react';
import styles from './Success.module.scss';
import { Button } from '@mozilla/lilypad';
import Image from 'next/image';

// Images
import cone from '../../../../public/cone.png';

const Success = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.success_wrapper}>
      <Image src={cone} className={styles.success_image} alt="celebrate" />

      <div>
        <h3 className={styles.success_title}>You're on the list</h3>
        <p className={styles.success_body}>
          Keep an eye out for product updates and an invite to join us as a
          tester.
        </p>
        <Button
          label="confirm"
          text="Got it"
          onClick={() => {
            setIsExpanded(false);
          }}
        />
      </div>
    </div>
  );
};

export default Success;
