import { Icon, Button } from '@mozilla/lilypad-ui';
import styles from './Warning.module.scss';

type WarningPropsT = {
  onClick: () => void;
  title: string;
  message: string;
};

const Warning = ({ onClick, title, message }: WarningPropsT) => (
  <div className={styles.warning}>
    <div className="flex-align-center mb-12">
      <Icon name="alert-triangle" classProp="flex-shrink-0 mr-12" />
      <h3>{title}</h3>
    </div>
    <p className="mb-24">{message}</p>

    <div className="flex-justify-end ">
      <Button onClick={onClick} text="Contact" />
    </div>
  </div>
);

export default Warning;
