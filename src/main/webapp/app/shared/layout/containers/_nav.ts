import CIcon from '@coreui/icons-react';

export default [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/admin/user-management',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Manage Devices',
    to: '/devices',
    icon: 'cil-devices',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Enrollment & Provisioning',
    to: '/enrollment',
    icon: 'cil-library-add',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Policies',
    to: '/policies',
    icon: 'cil-list-rich',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Branding',
  //   to: '',
  //   icon: 'cil-drop',
  // },
  {
    _tag: 'CSidebarNavItem',
    name: 'Managed Google Play Store',
    to: '/managed_play_store',
    icon: 'cib-google-play',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Geolocation',
    to: '/all-devices-geolocation',
    icon: 'cil-location-pin',
  },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Remote Control',
  //   to: '',
  //   icon: 'cil-cast',
  // },
  // {
  //   _tag: 'CSidebarNavItem',
  //   name: 'Reports',
  //   to: '',
  //   icon: 'cil-bar-chart',
  // },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['Settings'],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Security Settings',
    route: '',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Passcode Policy',
        icon: 'cil-applications-settings',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Whitelisting',
        icon: 'cil-check',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'VPN',
        icon: 'cil-ethernet',
        to: '',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Lock Unlock Devices',
        icon: 'cil-lock-locked',
        to: '',
      },
    ],
  },
];
