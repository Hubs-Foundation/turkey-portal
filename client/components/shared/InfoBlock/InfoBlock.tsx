import { Icon, IconT } from '@mozilla/lilypad-ui';
import styles from './InfoBlock.module.scss';

export type InfoBlockPropsT = {
  icon: IconT;
  label: string;
  description: string;
};

// INFO BLOCK COMPONENT
export const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div className="flex-box">
        <Icon name={icon} size={30} classProp="mr-20 mt-2 " />
      </div>
      <div className="body-md">
        <p>
          {' '}
          <span className="body-md-bold">{label}</span> <br /> {description}
        </p>
      </div>
    </div>
  );
};
