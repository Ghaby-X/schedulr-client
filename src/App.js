import React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Outlet } from 'react-router-dom';
import { AppProvider } from '@toolpad/core/react-router-dom';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'meeting',
    title: 'Meeting',
    icon: <PermContactCalendarIcon />,
  },
];


export default function App() {
  return (
    <AppProvider
      navigation={NAVIGATION}
    >
      <Outlet />
    </AppProvider>
  );
}