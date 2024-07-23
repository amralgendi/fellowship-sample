export type BackupData = {
  id: string;
  location: string;
  type: string;
  status: string;
};

export type Config = {
  dlp: {
    app_control: 1 | 2 | 3;
    device_control: {
      cd_dvd: 1 | 2 | 3;
      portable_device: 1 | 2 | 3;
      serial_port: 1 | 2 | 3;
      usb_port: 1 | 2 | 3;
      usb_storage_device: 1 | 2 | 3;
      webcam: 1 | 2 | 3;
    };
    web_filtering: 1 | 2 | 3;
  };
  "last backup_date": string;
  risk_score: number;
  threat_protection: {};
  total_violation: number;
};

export function SetCallback(func: (obj?: object) => void): void;
export function ReleaseCallback(): void;
export function TriggerCallback(obj?: object): void;
export function UserLoggedInStatus(): {
  success: boolean;
  data: string;
};
export function GetHwId(): string;
export function GetJson():
  | { success: false; message: string }
  | { success: true; json: Config };
export function GetBackupData():
  | { success: false; message: string }
  | { success: true; data: BackupData[] };
export function AddBackupData(
  arr: { type: string; path: string }[]
): { success: false; message: string } | { success: true; data: BackupData };

export function DeleteBackupData(
  id: string
): { success: false; message: string } | { success: true };

export function TestObject(obj: object): void;

export function SendCommand(obj: { command: string; data?: object }): {
  success: boolean;
  message: string;
  data?: object;
};

export function SendCommandAsync(
  obj: { command: string; data?: any },
  cb: (data: { success: boolean; message: string; data?: object }) => void
): {
  success: boolean;
  message: string;
};
