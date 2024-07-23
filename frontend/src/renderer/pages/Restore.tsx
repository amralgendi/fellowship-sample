import { useState } from 'react';
import Button from '../components/Buttons/Button';
import Card from '../components/Card';
import styles from './Restore.module.css';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import AddIcon from '@heroicons/react/24/solid/PlusIcon';
import UploadIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import MenuList from '../components/MenuList';
import Loader from '../components/Loader';
import Modal from '../components/Modal';

type RestoreDataProps = {
  id: string;
  time: string;
  name: string;
  status: '-' | 'Restored' | 'loading';
};

const Restore = () => {
  const [isOpenRestore, setOpenRestore] = useState(false);
  const [isRestoreLocation, setRestoreLocation] = useState(false);
  const [rowToDelete, setRowToDelete] = useState('');

  const restoreData: RestoreDataProps[] = [
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
    {
      id: 'ASFADF',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 1',
      status: 'Restored',
    },
    {
      id: 'WERDFT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 2',
      status: 'loading',
    },
    {
      id: 'WERDT',
      time: 'WEB Mar 20/02/2024',
      name: 'Backup 3',
      status: '-',
    },
  ];

  const handleInitRestore = (id: string) => {
    setRowToDelete(id);

    setOpenRestore(true);
  };

  const handleFinalRestore = (isOriginal: boolean) => {
    setOpenRestore(false);

    if (!isOriginal) {
      setRestoreLocation(true);
      return;
    }

    // SEND TO BACKEND

    setRowToDelete('');
  };

  return (
    <div className={styles.backupContainer}>
      {isOpenRestore && (
        <Modal
          title="Restore Item Location"
          handleClose={() => setOpenRestore(false)}
        >
          <div className={styles.restoreModal}>
            <Button
              id={'original'}
              text={'Original'}
              isBig={false}
              color={'BLACK'}
              onClick={() => handleFinalRestore(true)}
            />
            <Button
              id={'custom'}
              text={'Custom'}
              isBig={false}
              color={'BLACK'}
              onClick={() => handleFinalRestore(false)}
            />
          </div>
        </Modal>
      )}
      <Card extraStyles={styles.backupCardContainer}>
        <div className={styles.header}>
          <div>
            Secure your files against unexpected mishaps with our robust backup
            solutions, offering redundancy and reliability for your peace of
            mind
          </div>
          <Button
            id="restore-refresh"
            color="BLACK"
            isBig={false}
            text="Refresh"
            onClick={() => alert('REFRESH')}
          />
        </div>
        <div className={styles.main}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Time</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {restoreData.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.time}</td>
                    <td>{d.name}</td>
                    <td>
                      {d.status === 'loading' ? (
                        <Loader width={24} height={24} strokeWidth={2} />
                      ) : (
                        d.status
                      )}
                    </td>
                    <td>
                      <UploadIcon
                        onClick={() => handleInitRestore(d.id)}
                        width={24}
                        height={24}
                        fill="black"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Restore;
