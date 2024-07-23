import styles from './MainController.module.css';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import MinusIcon from '@heroicons/react/24/solid/MinusIcon';
import ControlButton from './Buttons/ControlButton';

const MainController = () => {
  const handleClose = () => {
    window.electron.ipcRenderer.sendMessage('close-window');
  };

  const handleMinimize = () => {
    window.electron.ipcRenderer.sendMessage('minimize-window');
  };

  const expired = true;

  return (
    <div className={styles.controlContainer}>
      <div className={styles.buttonsContainer}>
        <ControlButton
          icon={
            <MinusIcon
              strokeWidth={2}
              height={14}
              width={14}
              stroke="black"
              fill="black"
            />
          }
          onClick={handleMinimize}
        />
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
    </div>
  );
};

export default MainController;
