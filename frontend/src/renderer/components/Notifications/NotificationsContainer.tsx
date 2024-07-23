import styles from './NotificationsContainer.module.css';
import Overlay from '../Overlay';
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon';
import InfoIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import { useEffect, useState } from 'react';
import ControlButton from '../Buttons/ControlButton';

const NotificationsContainer = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const [close, setClose] = useState(true);

  const innerHandleClose = () => {
    setClose(true);
    setTimeout(handleClose, 300);
  };

  useEffect(() => {
    setTimeout(() => setClose(false), 10);
  }, []);

  const notifications = [
    {
      title: 'Notification 1',
      details: 'Brave is not good for your computer',
    },
    {
      title: 'Notification 2',
      details: 'Brave is not good for your computer',
    },
    {
      title: 'Notification 3',
      details: 'Brave is not good for your computer',
    },
    {
      title: 'Notification 4',
      details: 'Brave is not good for your computer',
    },
    {
      title: 'Notification 5',
      details: 'Brave is not good for your computer',
    },
    {
      title: 'Notification 6',
      details: 'Brave is not good for your computer',
    },
  ];
  return (
    <Overlay handleClose={innerHandleClose}>
      <div className={`${styles.container} ${close ? '' : styles.open}`}>
        <div className={styles.header}>
          <div>Notifications</div>

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
            onClick={innerHandleClose}
          />
        </div>
        <div className={styles.notifications}>
          {notifications.map((n) => (
            <div>
              <div className={styles.notificationContent}>
                <InfoIcon width={35} height={35} fill="black" />
                <div className={styles.content}>
                  <div className={styles.title}>{n.title}</div>
                  <div className={styles.details}>{n.details}</div>
                </div>
              </div>
              <div className={styles.date}>01/03/2024</div>
            </div>
          ))}
        </div>
      </div>
    </Overlay>
  );
};

export default NotificationsContainer;
