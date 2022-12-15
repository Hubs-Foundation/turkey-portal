import { MouseEventHandler, ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './ToolTip.module.scss';
import { Icon } from '@mozilla/lilypad';

const DESCRIPTIONS = {
    end_date : "end date description",
    max_capacity: "",
    refilling_threshold: ""
}

type ToolTipPropsT = {
    name: string;
  };

const ToolTip = ({ name }: ToolTipPropsT) => {
    const handleOnHover = () => {
        
    }

    return (
        <div>
            <div className={styles.messageCont}>
                {DESCRIPTIONS[name]}
            </div>
            <Icon name="info"/>
        </div>
    );
};

export default ToolTip;
