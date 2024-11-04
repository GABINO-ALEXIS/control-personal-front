import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from '../../containers/DashboardPage/DashboardPage';
import EmpleadosPage from '../../containers/EmpleadosPage/EmpleadosPage';
import { DashboardLayout } from '../ui/layouts/DashboardLayout';
import { EmpleadoDetalleLayout } from '../../containers/EmpleadosPage/layouts/EmpleadoDetalleLayout';

const RouterApp = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout />,
      errorElement: <h1>Not found</h1>,
      children: [
        {
          path: 'dashboard',
          element: <DashboardPage />,
        },
        {
          path: 'empleados',
          element: <EmpleadosPage />,
        },
        {
          path: 'empleados',
          element: <EmpleadosPage />,
        },
        {
          path: 'empleados/:empleadoId',
          element: <EmpleadoDetalleLayout />,
        },
        {
          path: '/*',
          element: <DashboardPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterApp;
