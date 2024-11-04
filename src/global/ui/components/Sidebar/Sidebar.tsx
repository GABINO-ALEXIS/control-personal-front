import { useDispatch, useSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';
import { SidebarNav } from './SidebarNav/SidebarNav';
import { SidebarTools } from './SidebarTools/SidebarTools';

export const Sidebar = () => {
  const dispatch = useDispatch();
  const isExpandSidebar = useSelector((state: RootState) => state.sidebar);

  return (
    <header className={`z-50 flex h-full bg-green-800 max-md:absolute`}>
      <SidebarTools />
      <SidebarNav />
    </header>
  );
};
