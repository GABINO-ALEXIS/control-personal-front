import { DashboardLayout } from '../ui/layouts/DashboardLayout';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Loading from '../ui/components/Loading/Loading';
import { DataTable } from '../../modules/empleado/components/EmpleadosTable/DataTable/DataTable';

const DashboardPage = lazy(
  () => import('../../containers/DashboardPage/DashboardPage'),
);
const EmpleadosPage = lazy(
  () => import('../../containers/EmpleadosPage/EmpleadosPage'),
);
const AsistenciaPage = lazy(
  () => import('../../containers/AsistenciaPage/AsistenciaPage'),
);
const EmpleadoDetalleLayout = lazy(
  () => import('../../containers/EmpleadosPage/layouts/EmpleadoDetalleLayout'),
);

const RouterApp = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <DashboardLayout />,
      errorElement: <h1>Error load page</h1>,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <DashboardPage />
            </Suspense>
          ),
        },
        {
          path: 'empleados',
          element: (
            <Suspense fallback={<Loading />}>
              <EmpleadosPage />
            </Suspense>
          ),
        },
        {
          path: 'empleados/:empleadoId',
          element: (
            <Suspense fallback={<Loading />}>
              <EmpleadoDetalleLayout />
            </Suspense>
          ),
        },
        {
          path: 'asistencias',
          element: (
            <Suspense fallback={<Loading />}>
              <AsistenciaPage />
            </Suspense>
          ),
        },
        {
          path: '/*',
          element: <h1>not found page</h1>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterApp;
