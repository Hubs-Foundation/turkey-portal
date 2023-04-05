import {
  MouseEventHandler,
  ReactNode,
  MouseEvent,
  useRef,
  useState,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

type ModalPropsT = {
  children: ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>;
  // "hasContainer" gives you the flexibility to put all the children in a pre-formatted modal card, This will be a majority of the time.
  // If you want a custome modal display, set this to false and add whatever you want to the "children"
  hasContainer?: Boolean;
  classProp?: string;
};

const Modal = ({
  children,
  onClose,
  hasContainer = true,
  classProp = '',
}: ModalPropsT) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById('modal_portal') as Element;
    setMounted(true);
  }, []);

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

  return mounted && ref.current ? (
    <>
      {ReactDOM.createPortal(
        <div
          id="backdropWrapper"
          className={styles.backdrop_wrapper}
          onClick={handleBackdropClick}
        >
          <div id="backdropContainer" className={styles.backdrop_container}>
            <div
              className={`${classProp} ${
                hasContainer && styles.modal_container
              }`}
            >
              {children}
            </div>
          </div>
        </div>,
        ref.current
      )}
    </>
  ) : null;
};

export default Modal;
