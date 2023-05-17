import { Button, ButtonCategoriesE, Icon, IconT } from '@mozilla/lilypad-ui';
import styles from './ConfirmModal.module.scss';
import Modal from '@Shared/Modal/Modal';
import { ReactNode } from 'react';

type ConfirmModalPropsT = {
  title: string;
  message: ReactNode;
  icon?: IconT;
  continueText?: string;
  cancelText?: string;
  onContinue: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({
  title,
  message,
  icon = 'alert-triangle',
  continueText = 'Continue',
  cancelText = 'Nevermind',
  onContinue,
  onCancel,
}: ConfirmModalPropsT) => {
  return (
    <Modal onClose={() => {}}>
      <div className={styles.wrapper}>
        {/* HEADER  */}
        <div className={styles.header}>
          {/* TODO update icon asset  */}
          {icon && <Icon name={icon} size={24} classProp="mr-10" />}
          <h2 className={styles.title}>{title}</h2>
        </div>

        {/* MODAL CONTENTS  */}
        <div className={styles.content}>{message}</div>

        {/* FOOTER ACTIONS  */}
        <div className={styles.footer_wrapper}>
          <div className={styles.footer_container}>
            <Button
              label="cancel"
              category={ButtonCategoriesE.PRIMARY_CLEAR}
              text={cancelText}
              classProp="mr-10-dt"
              onClick={onCancel}
            />
            <Button
              label="continue to firefox account"
              category={ButtonCategoriesE.PRIMARY_SOLID}
              classProp="mb-24-mb"
              text={continueText}
              target="_blank"
              onClick={onContinue}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
