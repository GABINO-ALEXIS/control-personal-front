import { IoNotificationsOutline } from 'react-icons/io5';
import { HiOutlineInformationCircle } from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const SidebarTools = () => {
  const isExpandSidebar = useSelector((state: RootState) => state.sidebar);

  return (
    <nav
      className={`flex flex-col items-center gap-6 overflow-hidden bg-primario px-2 py-5 transition-all duration-500 ${isExpandSidebar ? 'w-16' : 'w-0 gap-0 pb-0 pl-0 pr-0 pt-0'}`}
    >
      <div
        className={`bg-grisOscuro flex size-9 items-center justify-center rounded-full text-sm font-semibold text-negro`}
      >
        EV
      </div>
      <NavLink to="#">
        <IoNotificationsOutline
          className={`text-grisOscuro size-10 p-[0.5625rem] hover:rounded-2xl hover:bg-blanco hover:text-primario`}
        />
      </NavLink>
      <NavLink to="#">
        <HiOutlineInformationCircle
          className={`text-grisOscuro size-10 p-[0.5625rem] hover:rounded-2xl hover:bg-blanco hover:text-primario`}
        />
      </NavLink>
    </nav>
  );
};
