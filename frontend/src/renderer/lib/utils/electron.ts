import { electron } from 'process';
import {
  ChannelsToReply,
  ChannelsToSend,
  CommandProps,
  Commands,
  EventProps,
} from '../../../main/preload';

const sendElectronMessage = <T extends ChannelsToSend, TT extends Commands>(
  message: T,
  ...args: EventProps<T, TT>
): Promise<EventProps<`${T}-response`, TT>> => {
  return new Promise((resolve, reject) => {
    try {
      window.electron.ipcRenderer.once<`${T}-response`, TT>(
        `${message}-response`,
        (...newArgs) => {
          resolve(newArgs);
        },
      );
      window.electron.ipcRenderer.sendMessage<T, TT>(message, ...args);
    } catch (error) {
      reject(error);
    }
  });
};

const sendCommand = <T extends Commands>(command: T, data: CommandProps<T>) => {
  return sendElectronMessage('send-command', command, data);
};

export { sendElectronMessage, sendCommand };
