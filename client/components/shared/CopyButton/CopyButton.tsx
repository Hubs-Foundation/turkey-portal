import { useCallback, useState } from 'react';
import styles from './CopyButton.module.scss';
import {
  IconT,
  Button,
  ButtonCategoriesE,
  ButtonSizesE,
} from '@mozilla/lilypad';

export type CopyButtonPropsT = {
  active?: boolean;
  id?: string;
  text?: string;
  category?: ButtonCategoriesE;
  size?: ButtonSizesE;
  disabled?: boolean;
  icon?: IconT;
  iconPlacedRight?: boolean;
  onClick?: Function;
  classProp?: string;
};

const CopyButton = ({ onClick, classProp = '' }: CopyButtonPropsT) => {
  const [success, setSuccess] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    onClick && onClick();

    startSuccessTimer();
  }, []);

  const startSuccessTimer = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 1500);
  };

  return (
    <>
      {success ? (
        <div className={styles.success}>Copied!</div>
      ) : (
        <Button
          classProp={classProp}
          onClick={handleClick}
          icon="copy"
          size={ButtonSizesE.SMALL}
          category={ButtonCategoriesE.PRIMARY_CLEAR}
        />
      )}
    </>
  );
};

export default CopyButton;
