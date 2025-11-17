import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Login from '../pages/Login.jsx';
import Dashboard from '../dashboard/Dashboard.jsx';
import RouterProtect from './RouterProtect';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <RouterProtect />,
    children: [
      { path: '/', element: <AppLayout />, children: [{ index: true, element: <Dashboard /> }] }
    ]
  }
]);
