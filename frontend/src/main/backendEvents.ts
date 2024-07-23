import { ipcMain } from 'electron';
import {
  UserLoggedInStatus,
  GetHwId,
  SetCallback,
  GetJson,
  GetBackupData,
  AddBackupData,
  DeleteBackupData,
  TestObject,
  SendCommand,
  SendCommandAsync,
} from 'backend';

import {
  ChannelsToReply,
  ChannelsToSend,
  CommandProps,
  Commands,
  EventProps,
} from './preload';

const registerBackend = () => {
  // on('button-click', (event, buttonId) => {
  //   console.log('THIS BUTTON HAS BEEN CLICKED: ' + buttonId);

  //   reply(event, 'button-click-response', { id: buttonId });
  // });

  // on('init', (event) => {
  //   SetCallback((js) => {
  //     console.log('JSON UPDATED!');
  //     console.log(js);
  //   });
  //   const result = UserLoggedInStatus();

  //   reply(event, 'init-response', result.success, result.data);
  // });

  // on('get-hw-id', (event) => {
  //   const getHwIdRetry = (retries = 1): string => {
  //     console.log(retries);
  //     try {
  //       const hwId = GetHwId();
  //       return hwId;
  //     } catch (error) {
  //       if (retries < 3) return getHwIdRetry(retries + 1);
  //       throw error;
  //     }
  //   };

  //   const hwId = getHwIdRetry();
  //   reply(event, 'get-hw-id-response', hwId);
  // });

  // on('get-platform', (event) => {
  //   reply(event, 'get-platform-response', process.platform);
  // });

  // on('get-json', (event) => {
  //   const jsonRes = GetJson();

  //   reply(
  //     event,
  //     'get-json-response',
  //     jsonRes.success,
  //     jsonRes.success ? jsonRes.json : jsonRes.message,
  //   );
  // });

  // on('get-backup-data', (event) => {
  //   const backupData = GetBackupData();

  //   reply(
  //     event,
  //     'get-backup-data-response',
  //     ...[
  //       backupData.success,
  //       backupData.success ? backupData.data : backupData.message,
  //     ],
  //   );
  // });

  // on('add-backup-data', (event, arr: { type: string; path: string }[]) => {
  //   const backupData = AddBackupData(arr);

  //   reply(
  //     event,
  //     'add-backup-data-response',
  //     ...[
  //       backupData.success,
  //       backupData.success ? backupData.data : backupData.message,
  //     ],
  //   );
  // });

  // on('delete-backup-data', (event, id: string) => {
  //   const result = DeleteBackupData(id);

  //   reply(
  //     event,
  //     'delete-backup-data-response',
  //     ...[result.success, result.success ? null : result.message],
  //   );
  // });

  on('send-command', (event, command, data) => {
    console.log(command, data);
    const result = SendCommandAsync(
      { command, data },
      ({ success, message, data }) => {
        console.log('SECOND RES: ', success, message, data);
        if (success)
          reply(
            event,
            'send-command-response',
            success,
            message,
            data as { key: string },
          );
        else reply(event, 'send-command-response', success, message);
      },
    );

    console.log('FIRST RES: ', result);

    if (!result.success) {
      reply(event, 'send-command-response', result.success, result.message);
    }
  });
};

const on = <T extends ChannelsToSend, TT extends Commands>(
  channel: T,
  listener: (event: Electron.IpcMainEvent, ...args: EventProps<T, TT>) => void,
) => {
  ipcMain.on(channel, listener);
};

const reply = <T extends ChannelsToReply, TT extends Commands>(
  event: Electron.IpcMainEvent,
  channel: T,
  ...args: EventProps<T, TT>
) => {
  event.reply(channel, ...args);
};

export { registerBackend };
