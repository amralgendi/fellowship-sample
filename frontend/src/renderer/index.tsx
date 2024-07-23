import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { MemoryRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthContext';
import ConfigProvider from './contexts/ConfigContext';
import ErrorProvider from './contexts/ErrorContext';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <ErrorProvider>
    <ConfigProvider>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </ConfigProvider>
  </ErrorProvider>,
);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});

window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
