import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="relative flex h-dvh w-dvw overflow-hidden bg-blue-700">
      <Sidebar />
      <main className="flex h-full w-full max-md:pl-[47px]">
        <Outlet />
      </main>
    </div>
  );
};
