// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { BackupData, Config } from 'backend';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

const LOGIN_COMMAND: Commands = 'LOGIN';
export { LOGIN_COMMAND };

export type ChannelsToSend =
  | 'ipc-example'
  | 'close-window'
  | 'minimize-window'
  | 'send-command';

export type Commands =
  | 'LOGIN'
  | 'CHECK_IF_LOGGED_IN'
  | 'GET_CONFIG'
  | 'GET_BACKUP_DATA'
  | 'ADD_BACKUP_DATA'
  | 'DELETE_BACKUP_DATA'
  | 'UPDATE_DLP';

export type CommandProps<T extends Commands> = T extends 'LOGIN'
  ? { username: string; password: string; key?: string }
  : T extends 'ADD_BACKUP_DATA'
  ? { type: string; path: string }[]
  : T extends 'DELETE_BACKUP_DATA'
  ? string
  : T extends 'UPDATE_DLP'
  ? Config['dlp']
  : undefined;

export type CommandResponseProps<T extends Commands> =
  T extends 'CHECK_IF_LOGGED_IN'
    ? { key: string }
    : T extends 'GET_CONFIG'
    ? Config
    : T extends 'GET_BACKUP_DATA' | 'ADD_BACKUP_DATA'
    ? BackupData[]
    : undefined;

export type ChannelsToReply = `${ChannelsToSend}-response`;

export type Channels = ChannelsToSend | ChannelsToReply;

export type EventProps<
  T extends Channels,
  TT extends Commands,
> = T extends 'send-command'
  ? [TT, CommandProps<TT>]
  : T extends 'send-command-response'
  ? [true, string, CommandResponseProps<TT>] | [false, string]
  : unknown[];

const electronHandler = {
  ipcRenderer: {
    sendMessage<T extends ChannelsToSend, TT extends Commands>(
      channel: T,
      ...args: EventProps<T, TT>
    ) {
      ipcRenderer.send(channel, ...args);
    },
    on<T extends Channels, TT extends Commands>(
      channel: T,
      func: (...args: EventProps<T, TT>) => void,
    ) {
      const subscription = (
        _event: IpcRendererEvent,
        ...args: EventProps<T, TT>
      ) => func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once<T extends Channels, TT extends Commands>(
      channel: T,
      func: (...args: EventProps<T, TT>) => void,
    ) {
      const onceFunc = (_event: IpcRendererEvent, ...args: EventProps<T, TT>) =>
        func(...args);
      ipcRenderer.once(channel, onceFunc);
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
