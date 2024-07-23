import ReactDOM from 'react-dom';
import styles from './Overlay.module.css';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';

type LayoverProps = {
  hidden?: boolean;
  children: React.ReactNode;
  handleClose: () => void;
};

const Overlay = ({ hidden = false, children, handleClose }: LayoverProps) => {
  if (hidden) return null;

  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={handleClose}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body,
  );
};

export default Overlay;
