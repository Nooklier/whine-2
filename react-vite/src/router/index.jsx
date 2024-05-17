import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Homepage from '../components/Homepage/Homepage';
import Dashboard from '../components/Dashboard/Dashboard';
import Shifts from '../components/Shift/Shift';
import ShiftDetails from '../components/Shift/ShiftDetails';
import Pto from '../components/Pto/Pto';
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
        path: 'shift/:shiftId', 
        element: <ShiftDetails /> 
      },
      {
        path: 'pto',
        element: <Pto />
      }
    ],
  },
]);
