import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Homepage/Homepage';
import Dashboard from '../components/Dashboard/Dashboard';
import Shifts from '../components/Shift/Shift';
import Pto from '../components/Pto/Pto';
import TimeOffRequest from '../components/TimeOff/TimeOff';
import EditTimeOffRequest from '../components/TimeOff/TimeOffRequest';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'shift',
        element: <Shifts /> 
      },
      {
        path: 'pto',
        element: <Pto />
      },
      {
        path: 'timeoff',
        element: <TimeOffRequest />
      },
      {
        path: 'timeoff/edit/:id',
        element: <EditTimeOffRequest />
      }
    ],
  },
]);
