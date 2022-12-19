import { useState } from 'react';
import styles from './ToolTip.module.scss';
import { Icon } from '@mozilla/lilypad';
import FadeIn from '@Util/FadeIn';

type ToolTipPropsT = {
  description: string;
  classProp?: string;
};

const ToolTip = ({ description, classProp = '' }: ToolTipPropsT) => {
  const [show, setShow] = useState<boolean>(false);

  /**
   * Toggle Visibilty
   */
  const toggleToolTip = () => {
    setShow((state) => !state);
  };

  return (
    <section className={classProp}>
      <div onMouseEnter={toggleToolTip} onMouseLeave={toggleToolTip}>
        <Icon name="info" />
      </div>
      <FadeIn isVisible={show}>
        {show && <p className={styles.description}>{description}</p>}
      </FadeIn>
    </section>
  );
};

export default ToolTip;
