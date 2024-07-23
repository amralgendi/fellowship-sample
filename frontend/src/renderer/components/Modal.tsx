import styles from './Modal.module.css';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import Overlay from './Overlay';
import ControlButton from './Buttons/ControlButton';

type LayoverProps = {
  hidden?: boolean;
  children: React.ReactNode;
  title: string;
  extraStyles?: string;
  handleClose: () => void;
};

const Modal = ({ children, title, handleClose, extraStyles }: LayoverProps) => {
  return (
    <Overlay handleClose={handleClose}>
      <div className={`${styles.modal} ${extraStyles ? extraStyles : ''}`}>
        <div className={styles.titleContainer}>
          <div></div>
          <div className={styles.title}>{title}</div>

          <ControlButton
            icon={
              <XMarkIcon
                strokeWidth={2}
                height={14}
                width={14}
                stroke="black"
                fill="black"
              />
            }
            onClick={handleClose}
          />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </Overlay>
  );
};

export default Modal;
