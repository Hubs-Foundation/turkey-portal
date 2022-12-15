import { useState } from 'react';
import styles from './ToolTip.module.scss';
import { Icon } from '@mozilla/lilypad';

type ToolTipPropsT = {
    description: string;
  };

const ToolTip = ({ description }: ToolTipPropsT) => {
    const [show, setShow] = useState(false);

    return (
        <div className={styles.tip_cont}>
            <div 
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => setShow(false)}
            >
                <Icon name="info"/>
            </div>
            <div className={styles.tip_descript} style={show ? { visibility: "visible" } : {}}>
                {description}
            </div>
        </div>
    );
};

export default ToolTip;
