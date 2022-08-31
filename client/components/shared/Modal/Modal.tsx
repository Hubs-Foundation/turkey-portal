import { MouseEventHandler, ReactNode, MouseEvent } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

type ModalPropsT = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
  classProp?: string;
};

const Modal = ({ children, onClose, classProp = '' }: ModalPropsT) => {
  const portal = document.getElementById('modal_portal') as Element;

  /**
   * Backdrop Click
   * @param e MouseEvent
   */
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.target as Element;
    if (id === 'backdropContainer' || id === 'backdropWrapper') {
      onClose && onClose(e);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <div
          id="backdropWrapper"
          className={styles.backdrop_wrapper}
          onClick={handleBackdropClick}
        >
          <div id="backdropContainer" className={styles.backdrop_container}>
            <div className={`${classProp} ${styles.modal_container}`}>
              {children}
            </div>
          </div>
        </div>,
        portal
      )}
    </>
  );
};

export default Modal;
