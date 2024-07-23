import HomeIcon from '@heroicons/react/24/solid/Squares2X2Icon';
import ProtectionIcon from '@heroicons/react/24/solid/ShieldCheckIcon';
import DLPIcon from '@heroicons/react/24/solid/DocumentChartBarIcon';
import RestoreIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import SettingsIcon from '@heroicons/react/24/solid/Cog6ToothIcon';
import BackupIcon from '@heroicons/react/24/solid/CircleStackIcon';

import routes from './routes';

export default [
  {
    label: routes.find((r) => r.route === '/')!.label,
    route: '/',
    logo: HomeIcon,
  },
  {
    label: routes.find((r) => r.route === '/protection')!.label,
    route: '/protection',
    logo: ProtectionIcon,
  },
  {
    label: routes.find((r) => r.route === '/dlp')!.label,
    route: '/dlp',
    logo: DLPIcon,
  },
  {
    label: routes.find((r) => r.route === '/backup')!.label,
    route: '/backup',
    logo: BackupIcon,
  },
  {
    label: routes.find((r) => r.route === '/restore')!.label,
    route: '/restore',
    logo: RestoreIcon,
  },
  {
    label: routes.find((r) => r.route === '/settings')!.label,
    route: '/settings',
    logo: SettingsIcon,
  },
];
