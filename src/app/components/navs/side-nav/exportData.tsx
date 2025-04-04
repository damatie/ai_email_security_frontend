import { Icon } from '@iconify/react/dist/iconify.js';

const iconClass = 'h-6 w-6 font-semibold';

export const menuItems = [
  {
    id: 1,
    name: 'Dashboard',
    path: '/dashboard',
    icon: <Icon icon="ic:round-bar-chart" className={iconClass} />,
  },
  {
    id: 2,
    name: 'Threat Logs',
    path: '/threat-logs',
    icon: <Icon icon="fluent:mail-48-regular" className={iconClass} />,
  },
  {
    id: 3,
    name: 'Remediation Logs',
    path: '/remediation-logs',
    icon: <Icon icon="fluent:shield-20-regular" className={iconClass} />,
  },
  {
    id: 4,
    name: 'Connect Email',
    path: '/connect-email',
    icon: (
      <Icon icon="fluent:plug-disconnected-48-regular" className={iconClass} />
    ),
  },
  // {
  //   id: 5,
  //   name: 'Settings',
  //   path: '/settings',
  //   icon: <Icon icon="solar:settings-outline" className={iconClass} />,
  // },
];
