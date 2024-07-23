import styles from './TabSelector.module.css';
import FeedbackIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftEllipsisIcon';
import { NavLink, useLocation } from 'react-router-dom';
import tabs from '../tabs';
import Logo from '../icons/logo.png';

const TabSelector = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <NavLink to={`${t.route}`} key={t.route}>
            {({ isActive, isPending }) => (
              <div
                className={`${styles.iconLabel} ${styles.tab} ${
                  isActive ? styles.active : ''
                }`}
              >
                <div>
                  <t.logo
                    width={30}
                    height={30}
                    fill={isActive ? '#161639' : 'white'}
                  />
                </div>
                <div>{t.label}</div>
              </div>
            )}
          </NavLink>
        ))}
      </div>
      <div className={styles.feedback}>
        <NavLink to="/feedback">
          {({ isActive, isPending }) => (
            <div
              className={`${styles.iconLabel} ${styles.tab} ${
                isActive ? styles.active : ''
              }`}
            >
              <div>
                <FeedbackIcon
                  width={30}
                  height={30}
                  stroke="white"
                  fill={isActive ? '#161639' : 'white'}
                />
              </div>
              <div>Feedback</div>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default TabSelector;
