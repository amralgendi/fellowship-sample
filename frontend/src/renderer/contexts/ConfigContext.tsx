// import { WhoAmIRequest } from '@/api';
import React, { useContext, useEffect, useState } from 'react';
import { sendCommand } from '../lib/utils/electron';
import { BackupData, Config } from 'backend';
import { ErrorContext } from './ErrorContext';
import { isErrored } from 'stream';

export interface IConfig {
  loading: boolean;
  config: Config | null;
  backupData: BackupData[];
  addBackupData: (data: BackupData[]) => void;
  deleteBackupData: (ids: string[]) => void;
  refreshConfig: () => void;
  refreshBackup: () => void;
  updateDLP: (dlp: Config['dlp']) => Promise<void>;
}

const defaultState: IConfig = {
  loading: true,
  config: null,
  backupData: [],
  addBackupData: (data) => {},
  deleteBackupData: (data) => {},
  refreshConfig: () => {},
  refreshBackup: () => {},
  updateDLP: (dlp) => new Promise(() => {}),
};

type Props = {
  children?: React.ReactNode;
};

export const ConfigContext = React.createContext(defaultState);

const ConfigProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState(defaultState.loading);
  const [config, setConfig] = useState(defaultState.config);
  const [backupData, setBackupData] = useState(defaultState.backupData);
  const { setError } = useContext(ErrorContext);

  const getJsonAsync = async () => {
    const [success, message, newConfig] = await sendCommand(
      'GET_CONFIG',
      undefined,
    );

    console.log('HERE!', config?.dlp.device_control.usb_port);

    if (!config)
      setConfig({
        total_violation: 12,
        risk_score: 98,
        'last backup_date': '31-05-23 13:12',
        threat_protection: {},
        dlp: {
          device_control: {
            usb_storage_device: 1,
            cd_dvd: 2,
            portable_device: 2,
            webcam: 2,
            usb_port: 2,
            serial_port: 2,
          },
          app_control: 2,
          web_filtering: 2,
        },
      });

    // if (success) {
    //   setConfig(config);
    //   console.log('CONFIG DATA: ', config);
    // } else {
    //   console.error(config);
    // }
  };
  useEffect(() => {
    console.log('DLP:', config?.dlp);
  }, [config?.dlp]);

  const getBackupDataAsync = async () => {
    const [success, message, data] = await sendCommand(
      'GET_BACKUP_DATA',
      undefined,
    );

    const arr: BackupData[] = [];
    for (let i = 1; i <= 20; i++) {
      arr.push({
        id: i.toString(),
        location: 'C:\\',
        status: '-',
        type: 'folder',
      });
    }

    setBackupData(arr);

    // if (success) {
    //   setBackupData(data);
    //   console.log('BACKUP DATA: ', data);
    // } else {
    //   console.error(data);
    // }
  };

  useEffect(() => {
    Promise.all([getJsonAsync(), getBackupDataAsync()]).finally(() =>
      setLoading(false),
    );
  }, []);

  const refreshConfig = () => {
    getJsonAsync();
  };

  const refreshBackup = () => {
    getBackupDataAsync();
  };

  const addBackupData = (data: BackupData[]) => {
    setBackupData([...backupData, ...data]);
  };

  const deleteBackupData = (ids: string[]) => {
    setBackupData(backupData.filter((d) => !ids.includes(d.id)));
  };

  const updateDLP = async (dlpOptions: Config['dlp']) => {
    if (!config) return;

    const tmp = config!.dlp;

    setConfig({ ...config, dlp: dlpOptions });

    const [success, message] = await sendCommand('UPDATE_DLP', dlpOptions);
    if (!success) {
      setConfig({ ...config, dlp: tmp });

      setError({ isError: true, data: { message } });
    }
  };

  const state: IConfig = {
    loading,
    config,
    backupData,
    addBackupData,
    deleteBackupData,
    refreshConfig,
    refreshBackup,
    updateDLP,
  };

  return (
    <ConfigContext.Provider value={state}>{children}</ConfigContext.Provider>
  );
};

export default ConfigProvider;
