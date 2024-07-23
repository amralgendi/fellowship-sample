import { logIn } from '../api/auth';
import { sendElectronMessage } from './electron';

type LogInProps = {
  username: string;
  password: string;
};

const loginButtonHandler = async (data: LogInProps): Promise<boolean> => {
  return true;
};

type UploadImageProps = {
  image: File;
};
const uploadProfileImageHandler = async (data: UploadImageProps) => {};

type KeyChangeProps = {
  key: string;
};
const keyChangeHandler = async (data: KeyChangeProps) => {};

type ChangePasswordProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
const changePasswordHandler = async (data: ChangePasswordProps) => {};

const logoutHandler = async () => {};

const saveDLPHandler = async () => {};

type ConnectServerProps = {
  address: string;
};
const connectServerHandler = async (data: ConnectServerProps) => {};

const updatePolicyHandler = async () => {};

const toggleServerHandler = async () => {};

type GenerateReportFileProps = {
  bool: boolean;
};
const generateReportFileHandler = async (data: GenerateReportFileProps) => {};

type DefaultActionsScanProps = {
  bool: boolean;
};
const defaultActionsScanHandler = async (data: DefaultActionsScanProps) => {};

type SendFeedbackProps = {
  title: string;
  message: string;
};
const sendFeedbackHandler = async (data: SendFeedbackProps) => {};

const refreshRestoreHandler = async () => {};

type RestoreFileProps = {
  itemId: string;
};
const restoreFileHandler = async (data: RestoreFileProps) => {};

const scanHandler = async () => {};

export {
  loginButtonHandler,
  uploadProfileImageHandler,
  keyChangeHandler,
  changePasswordHandler,
  logoutHandler,
  saveDLPHandler,
  connectServerHandler,
  updatePolicyHandler,
  toggleServerHandler,
  generateReportFileHandler,
  defaultActionsScanHandler,
  sendFeedbackHandler,
  refreshRestoreHandler,
  restoreFileHandler,
  scanHandler,
};
