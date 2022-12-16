import { useState } from 'react';
import styles from './ToolTip.module.scss';
import { Icon } from '@mozilla/lilypad';

type ToolTipPropsT = {
  description: string;
};

const ToolTip = ({ description }: ToolTipPropsT) => {
  const [show, setShow] = useState<boolean>(false);

  /**
   * Toggle Visibilty
   */
  const toggleToolTip = () => {
    setShow((state) => !state);
  };

  return (
    <section className={styles.container}>
      <div onMouseEnter={toggleToolTip} onMouseLeave={toggleToolTip}>
        <Icon name="info" />
      </div>
      {show && <p className={styles.description}>{description}</p>}
    </section>
  );
};

export default ToolTip;
