import { Icon, IconT } from '@mozilla/lilypad-ui';
import styles from './InfoBlock.module.scss';

export type InfoBlockPropsT = {
  icon: IconT;
  label: string;
  description?: string;
  centered?: boolean;
};

// INFO BLOCK COMPONENT
export const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      <div>
        <Icon name={icon} size={30} classProp="mr-20 mt-2 " />
      </div>

      <div className="body-md">
        <span className="body-md-bold">{label}</span>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};
