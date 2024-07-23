// import { WhoAmIRequest } from '@/api';
import React, { useContext, useEffect, useState } from 'react';
import { sendCommand } from '../lib/utils/electron';
import { BackupData, Config } from 'backend';
import ErrorModal from '../components/ErrorModal';

type Error =
  | {
      isError: false;
      data?: undefined;
    }
  | {
      isError: true;
      data: {
        message: string;
      };
    };

export type ErrorContextType = Error & {
  setError: (err: Error) => void;
};

const defaultState: ErrorContextType = {
  isError: false,
  setError: (err) => {},
};

type Props = {
  children?: React.ReactNode;
};

export const ErrorContext = React.createContext<ErrorContextType>(defaultState);

const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState<Error>(defaultState);

  return (
    <ErrorContext.Provider value={{ ...error, setError }}>
      {error.isError && (
        <ErrorModal
          message={error.data.message}
          handleClose={() => setError({ isError: false })}
        />
      )}
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
