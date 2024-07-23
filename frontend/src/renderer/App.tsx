import { Routes, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import MainController from './components/MainController';
import TabSelector from './components/TabSelector';
import ProfileViewer from './components/ProfileViewer';
import routes from './routes';
import Expired from './components/Expired';
import {
  AuthContext,
  AuthIsNotSignedIn,
  AuthIsSignedIn,
} from './contexts/AuthContext';
import SignIn from './pages/Signin';
import { useContext, useEffect } from 'react';
import { sendCommand } from './lib/utils/electron';
import { isSessionActive } from './lib/api/auth';

export default function App() {
  const routerLocation = useLocation();
  const { signIn } = useContext(AuthContext);

  console.log(routes);
  console.log(routerLocation.pathname);

  useEffect(() => {
    const initAsync = async () => {
      const [success, message, data] = await sendCommand(
        'CHECK_IF_LOGGED_IN',
        undefined,
      );

      console.log('RESULT OF INIT: ', success, data);

      if (!success) return;

      const isActive = await isSessionActive(data.key);

      if (!isActive) return;

      signIn();
    };

    initAsync();
  }, []);

  return (
    <>
      <div className={styles.mainContainer}>
        <MainController />

        <AuthIsNotSignedIn>
          <Routes>
            <Route path="/" element={<SignIn />} />
          </Routes>
        </AuthIsNotSignedIn>

        <AuthIsSignedIn>
          <TabSelector />

          <div className={styles.mainSubContainer}>
            <Expired />

            <div className={styles.container}>
              <ProfileViewer />
              <div className={styles.mainContent}>
                <div className={styles.scrollable}>
                  <Routes>
                    {routes.map((r) => (
                      <Route
                        key={r.route}
                        path={r.route}
                        element={<r.page />}
                      />
                    ))}
                  </Routes>
                </div>
              </div>
              <div className={styles.endCard}>
                <div className={styles.disabled}>
                  The protection is Disabled
                </div>
                <div>
                  License till 31st May 2024 <span>Extend</span>
                </div>
              </div>
            </div>
          </div>
        </AuthIsSignedIn>
      </div>
    </>
  );
}
