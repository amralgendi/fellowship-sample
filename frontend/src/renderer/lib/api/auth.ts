const isSessionActive = (key: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), 1000);
  });
};

type LogInProps = {
  username: string;
  password: string;
  os: number;
  mac_address: string;
  hardware_value: string;
};
const logIn = (props: LogInProps): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export { isSessionActive, logIn };
