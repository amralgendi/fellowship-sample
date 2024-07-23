import styles from './Expired.module.css';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import MinusIcon from '@heroicons/react/24/solid/MinusIcon';

const Expired = () => {
  const handleClose = () => {
    window.electron.ipcRenderer.sendMessage('close-window');
  };

  const handleMinimize = () => {
    window.electron.ipcRenderer.sendMessage('minimize-window');
  };

  const expired = true;

  return (
    expired && (
      <div className={styles.expiredBanner}>
        License has been expired &nbsp; &nbsp;
        <a href="#">
          <span>Renew</span>
        </a>
      </div>
    )
  );
};

export default Expired;
