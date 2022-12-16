import { useState } from 'react';
import styles from './ToolTip.module.scss';
import { Icon } from '@mozilla/lilypad';

const DESCRIPTIONS = {
    end_date : "Participants joining after the event has ended will be routed to your post-event webpage.",
    max_capacity: "Participants will be added to this room group until max capacity is reached.",
    refilling_threshold: "After being filled to max capacity, this group will not accept any new participants until its user count falls below this threshold.",
    landing_room: "Once sorted into a room group, participants will randomly populate any rooms specified as a 'Landing Room'. At least one room must be designated per group."
  }

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
                {DESCRIPTIONS[description as keyof typeof DESCRIPTIONS]}
            </div>
        </div>
    );
};

export default ToolTip;
