import { useState } from 'react';
import styles from './Error.module.scss';
import { Button } from '@mozilla/lilypad';
import Image from 'next/image';
// Images
import critical from '../../../../public/critical.png';

const Error = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.error_wrapper}>
      <div>
        <Image src={critical} className={styles.error_icon} alt="warning" />
      </div>
      <div>
        <h3 className={styles.error_title}>We ran into a problem</h3>

        <p className={styles.error_body}>
          Sorry, we were unable to add you to the mailing list, please try again
          later. If the problem persists please reach out on our{' '}
          <a
            href="https://discord.com/invite/dFJncWwHun"
            rel="noopener noreferrer"
            target="_blank"
          >
            Discord
          </a>
          .
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

export default Error;
