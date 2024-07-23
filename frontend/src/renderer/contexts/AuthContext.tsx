// import { WhoAmIRequest } from '@/api';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export interface IAuth {
  authStatus?: AuthStatus;
  signIn: () => void;
  signOut: () => void;
}

const defaultState: IAuth = {
  authStatus: AuthStatus.Loading,
  signIn: null!,
  signOut: null!,
};

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return authStatus === AuthStatus.SignedIn ? children : null;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return authStatus === AuthStatus.SignedOut ? children : null;
};

const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.Loading);
  console.log(authStatus);
  useEffect(() => {
    async function getWhoAmI() {
      try {
        setAuthStatus(AuthStatus.SignedOut);
      } catch (e) {
        setAuthStatus(AuthStatus.SignedIn);
      }
    }
    getWhoAmI().then();
  }, []);

  function signIn() {
    console.log('sign in');
    setAuthStatus(AuthStatus.SignedIn);
  }

  function signOut() {
    console.log('sign out');
    setAuthStatus(AuthStatus.SignedOut);
  }

  const state: IAuth = {
    authStatus,
    signIn,
    signOut,
  };

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
