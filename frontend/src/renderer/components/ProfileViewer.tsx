import ProfileIcon from '@heroicons/react/24/solid/UserIcon';
import NotificationIcon from '@heroicons/react/24/solid/BellIcon';
import DropdownIcon from '@heroicons/react/24/solid/ChevronDownIcon';
import DropdownUpIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import styles from './ProfileViewer.module.css';
import tabs from '../tabs';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuList from './MenuList';
import { useContext, useState } from 'react';
import routes from '../routes';
import BackIcon from '@heroicons/react/24/solid/ArrowLongLeftIcon';
import ProfileSettingsIcon from '@heroicons/react/24/solid/UserCircleIcon';
import KeyIcon from '@heroicons/react/24/solid/KeyIcon';
import LockIcon from '@heroicons/react/24/solid/LockClosedIcon';
import LicenseIcon from '@heroicons/react/24/solid/InformationCircleIcon';
import LogoutIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import AboutIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';

import Modal from './Modal';
import UploadProfilePicForm from './Forms/UploadProfilePicForm';
import NewKeyForm from './Forms/NewKeyForm';
import ChangePasswordForm from './Forms/ChangePasswordForm';
import LicensesInfoModal from './LicensesInfoModal';
import MasterPasswordForm from './Forms/MasterPasswordForm';
import AboutModal from './AboutModal';
import NotificationsContainer from './Notifications/NotificationsContainer';
import { AuthContext } from '../contexts/AuthContext';
import React from 'react';

const ProfileViewer = () => {
  const [overlay, setOverlay] = useState<React.ReactNode>(null);
  const [openNotifications, setOpenNotifications] = useState(false);

  const { signOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const settings = [
    {
      label: 'Change profile image',
      icon: ProfileSettingsIcon,
      action: () => {
        setOverlay(
          <UploadProfilePicForm handleClose={() => setOverlay(null)} />,
        );
      },
    },
    {
      label: 'Key change',
      icon: KeyIcon,
      action: () => {
        setOverlay(
          <Modal title="Enter new key" handleClose={() => setOverlay(null)}>
            <NewKeyForm />
          </Modal>,
        );
      },
    },
    {
      label: 'Change password',
      icon: LockIcon,
      action: () => {
        setOverlay(
          <Modal title="Change password" handleClose={() => setOverlay(null)}>
            <ChangePasswordForm />
          </Modal>,
        );
      },
    },
    {
      label: 'Licenses info',
      icon: LicenseIcon,
      action: () => {
        setOverlay(<LicensesInfoModal handleClose={() => setOverlay(null)} />);
      },
    },
    {
      label: 'About',
      icon: AboutIcon,
      action: () => {
        setOverlay(<AboutModal handleClose={() => setOverlay(null)} />);
      },
    },
    {
      label: 'Logout',
      icon: LogoutIcon,
      action: () => {
        navigate('/');
        signOut();
      },
    },
  ];

  const routerLocation = useLocation();

  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const route = routes.find((r) => r.route === routerLocation.pathname);

  if (!route) throw new Error('PROBLEM, NO ROUTE FOUND');

  const ascendingPathNames = route.route.split('/');
  ascendingPathNames.shift();

  const ascendingRoutes = ascendingPathNames
    .map((_, i) => '/' + ascendingPathNames.slice(0, i + 1).join('/'))
    .map((p) => routes.find((r) => r.route === p)!);

  console.log(ascendingRoutes);

  console.log(ascendingPathNames);

  console.log(route);

  return (
    <div>
      {openNotifications && (
        <NotificationsContainer
          handleClose={() => setOpenNotifications(false)}
        />
      )}
      <div className={styles.profileContainer}>
        <div className={styles.tabName}>
          {ascendingRoutes.length > 1 && (
            <Link to={ascendingRoutes[ascendingRoutes.length - 2].route}>
              <BackIcon width={24} height={24} fill="black" />
            </Link>
          )}
          {ascendingRoutes.map((r) => (
            <>
              {r.route === routerLocation.pathname ? (
                <div key={r.route}>{r.label}</div>
              ) : (
                <React.Fragment key={r.route}>
                  <Link to={r.route}>
                    <div>{r.label}</div>
                  </Link>
                  <div>/</div>
                </React.Fragment>
              )}
            </>
          ))}
        </div>

        <button
          onClick={() => {
            window.electron.ipcRenderer.sendMessage(
              'button-click',
              'notification',
            );
            setOpenNotifications(true);
          }}
          className={`${styles.notifications} ${styles.exists}`}
        >
          <NotificationIcon
            width="100%"
            fill="linear-gradient(to bottom, #3e3e9f, #161639))"
          />
        </button>

        <div className={styles.profile}>
          <div className={styles.profileName}>
            <div className={styles.title}>Hello</div>
            <div className={styles.subtitle}>Praveen</div>
          </div>

          <div className={styles.profileImageDropdown}>
            <div
              className={styles.profileImage}
              style={{
                padding: 5,
                width: 72,
                height: 72,
                background: 'black',
                borderRadius: 12,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ProfileIcon
                width="100%"
                height="100%"
                fill="white"
                stroke="white"
              />
            </div>

            <button
              onClick={() => {
                window.electron.ipcRenderer.sendMessage(
                  'button-click',
                  'settings-dropdown',
                );
                setSettingsOpen((open) => !open);
              }}
              className={styles.profileDropdown}
            >
              {isSettingsOpen ? (
                <DropdownUpIcon fill="black" width={24} height={24} />
              ) : (
                <DropdownIcon fill="black" width={24} height={24} />
              )}
            </button>
          </div>
        </div>

        <MenuList
          setOpen={setSettingsOpen}
          settings={settings}
          isOpen={isSettingsOpen}
        />
        {overlay}
      </div>
    </div>
  );
};

export default ProfileViewer;
