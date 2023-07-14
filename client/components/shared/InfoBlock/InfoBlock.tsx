import { HubIcon, HubIconT, Icon } from '@mozilla/lilypad-ui';
import styles from './InfoBlock.module.scss';

export type InfoBlockPropsT = {
  icon?: HubIconT | null;
  label: string;
  description?: string;
};

const InfoBlock = ({ icon, label, description }: InfoBlockPropsT) => {
  return (
    <div className={styles.info_wrapper}>
      {icon && (
        <HubIcon
          name={icon}
          size={30}
          classProp={`mr-20 ${description ? 'mt-2' : styles.icon}`}
        />
      )}

      {!icon && (
        <div className="color-semantic-success">
          <Icon color="currentColor" name="check" classProp="mr-25 ml-3" />
        </div>
      )}

      <div className={`body-md ${description ? '' : 'mb-16'}`}>
        <span className="body-md-bold">{label}</span>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
};

export default InfoBlock;
