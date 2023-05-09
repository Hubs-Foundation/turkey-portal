import { HubIcon, HubIconT } from '@mozilla/lilypad-ui';
import styles from './InfoBlock.module.scss';

type InfoBlockPropsT = {
  icon: HubIconT;
  label: string;
  description: string;
};

// INFO BLOCK COMPONENT
const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div className="flex-box">
        <HubIcon name={icon} size={30} classProp="mr-20 mt-2 " />
      </div>
      <div className="body-md">
        <p>
          <span className="body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};

export default InfoBlock;
