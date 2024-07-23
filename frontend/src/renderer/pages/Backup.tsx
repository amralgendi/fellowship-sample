import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../components/Buttons/Button';
import Card from '../components/Card';
import Loader from '../components/Loader';
import styles from './Backup.module.css';
import ClockIcon from '@heroicons/react/24/solid/ClockIcon';
import AddIcon from '@heroicons/react/24/solid/PlusIcon';
import DeleteIcon from '@heroicons/react/24/solid/TrashIcon';
import MenuList from '../components/MenuList';
import Modal from '../components/Modal';
import SelectionInput from '../components/Forms/FormInputs/SelectionInput';
import MultipleInput from '../components/Forms/FormInputs/MultipleInput';
import Form from '../components/Forms/Form';
import { ConfigContext } from '../contexts/ConfigContext';
import { sendCommand } from '../lib/utils/electron';
import ChangeScheduleForm from '../components/Forms/ChangeScheduleForm';

const Backup = () => {
  const { config, backupData, addBackupData, deleteBackupData } =
    useContext(ConfigContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const [categoryValues, setCategoryValues] = useState<string[]>([]);

  const [isOpenAdd, setOpenAdd] = useState(false);

  const handleFileInput = async (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.files);
    const data: { type: string; path: string }[] = [];
    for (const file of e.currentTarget.files!) {
      data.push({ type: 'file', path: file.path });
    }

    console.log(data);

    const [success, message, backupData] = await sendCommand(
      'ADD_BACKUP_DATA',
      data,
    );

    if (success) {
      addBackupData(backupData);
    } else {
      console.error(backupData);
    }
  };

  const handleDelete = async (id: string) => {
    const tmp = backupData.find((d) => d.id === id);
    if (!tmp) return;

    deleteBackupData([id]);

    const [success, message] = await sendCommand('DELETE_BACKUP_DATA', id);

    if (!success) {
      addBackupData([tmp]);
      alert(message);
    }
  };

  return (
    <div className={styles.backupContainer}>
      <input
        ref={fileInputRef}
        type="file"
        name="file-add"
        id="file-add"
        className={styles.inputFile}
        multiple={true}
        onInput={handleFileInput}
      />
      <input
        ref={folderInputRef}
        type="file"
        name="folder-add"
        id="folder-add"
        className={styles.inputFile}
        multiple={true}
        /* @ts-expect-error */
        directory=""
        webkitdirectory=""
        onInput={(e) => {
          setCategoryModalOpen(true);
          console.log(e);
        }}
      />

      {categoryModalOpen && (
        <Modal
          title="Select Categories"
          handleClose={() => setCategoryModalOpen(false)}
        >
          <Form
            inputs={[
              {
                type: 'MULTIPLE',
                availableValues: [
                  {
                    label:
                      'Document files (.doc, .docx, .xls, .xlsx, .rtf, etc)',
                    value: 'documents',
                  },
                  {
                    label: 'Executable files (.exe, .msi, etc)',
                    value: 'executables',
                  },
                  {
                    label: 'PDF files (.pdf)',
                    value: 'pdf',
                  },
                  {
                    label: 'Images files (.jpeg, .jpg, .png, etc)',
                    value: 'images',
                  },
                ],
                values: [],
                key: 'categories',
              },
            ]}
            handleSubmit={(values) => {
              setCategoryModalOpen(false);
              console.log(values);
            }}
            isLoading={false}
          />
        </Modal>
      )}
      {scheduleOpen && (
        <ChangeScheduleForm
          handleClose={() => setScheduleOpen(false)}
          currValue={'Never'}
        />
      )}

      <Card extraStyles={styles.backupCardContainer}>
        <div className={styles.header}>
          <div>
            Secure your files against unexpected mishaps with our robust backup
            solutions, offering redundancy and reliability for your peace of
            mind
          </div>
          <div className={styles.add}>
            <button
              onClick={() => {
                // window.electron.ipcRenderer.sendMessage(
                //   'button-click',
                //   'backup-add',
                // );
                setOpenAdd((open) => !open);
              }}
            >
              <AddIcon width={24} height={24} fill="white" />
            </button>
            <MenuList
              setOpen={setOpenAdd}
              isOpen={isOpenAdd}
              containerStyles={styles.addMenuContainer}
              menuStyles={styles.addMenu}
              settings={[
                {
                  action: () => {
                    fileInputRef.current!.value = '';
                    fileInputRef.current?.click();
                  },
                  label: 'Add Files',
                },
                {
                  action: () => {
                    folderInputRef.current!.value = '';
                    folderInputRef.current?.click();
                  },
                  label: 'Add Directory',
                },
              ]}
            />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {backupData.map((d, i) => (
                  <tr key={i}>
                    <td>{d.id}</td>
                    <td>{d.location}</td>
                    <td>{d.type}</td>
                    <td>{d.status}</td>
                    <td>
                      <DeleteIcon
                        onClick={() => handleDelete(d.id)}
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

        <div className={styles.footer}>
          <div>
            <div>
              <button
                onClick={() => {
                  // window.electron.ipcRenderer.sendMessage(
                  //   'button-click',
                  //   'backup-schedule',
                  // );
                  setScheduleOpen(true);
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                }}
              >
                <ClockIcon width={24} height={24} fill="black" />
              </button>
              <div className={styles.schedule}>Scheduled Time</div>
            </div>
            <div className={styles.backupTime}>
              Last backup time - <span>{config?.['last backup_date']}</span>
            </div>
          </div>
          <div>
            <Button
              id="backup-start"
              text="Start Backup"
              isBig={false}
              color={'BLACK'}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Backup;
