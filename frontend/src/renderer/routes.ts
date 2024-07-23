import React from 'react';
import Home from './pages/Home';
import Protection from './pages/Protection';
import ProtectionFull from './pages/ProtectionFull';
import Backup from './pages/Backup';
import Settings from './pages/Settings';
import DLP from './pages/DLP';
import Feedback from './pages/Feedback';
import Restore from './pages/Restore';
import SignIn from './pages/Signin';

export default [
  { label: 'Home', route: '/', page: Home },
  { label: 'Protection', route: '/protection', page: Protection },
  { label: 'Full Scan', route: '/protection/full', page: ProtectionFull },
  { label: 'Quick Scan', route: '/protection/quick', page: React.Fragment },
  {
    label: 'Targeted Scan',
    route: '/protection/targeted',
    page: React.Fragment,
  },
  { label: 'Boot Time Scan', route: '/protection/boot', page: React.Fragment },
  { label: 'DLP', route: '/dlp', page: DLP },
  { label: 'Backup', route: '/backup', page: Backup },
  { label: 'Restore', route: '/restore', page: Restore },
  { label: 'Settings', route: '/settings', page: Settings },
  { label: 'Feedback', route: '/feedback', page: Feedback },
];
