import { VscDashboard } from 'react-icons/vsc';
import { AiOutlineTeam } from 'react-icons/ai';
import { IoIosTimer } from 'react-icons/io';
import { TbCheckupList, TbFileSpreadsheet } from 'react-icons/tb';
import { BiCalendarWeek } from 'react-icons/bi';
import logo from '../../../../../assets/logo-servicios-generales-venancio.svg';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { Link, LinkType } from './Link';
import { useSelector, useDispatch } from '../../../../store/hooks';
import { RootState } from '../../../../store/store';
import { toggleSidebar } from '../../../contexts/sidebarSlice';

export const SidebarNav = () => {
  const dispatch = useDispatch();
  const isExpandSidebar = useSelector((state: RootState) => state.sidebar);

  const links: LinkType[] = [
    {
      to: '/',
      icono: <VscDashboard className="mx-2 size-5" />,
      texto: 'Dashboard',
      isExpandSidebar,
    },
    {
      to: 'empleados',
      icono: <AiOutlineTeam className="mx-2 size-5" />,
      texto: 'Empleados',
      isExpandSidebar,
    },
    {
      to: 'asistencias',
      icono: <TbCheckupList className="mx-2 size-5" />,
      texto: 'Asistencias',
      isExpandSidebar,
    },
    {
      to: 'semanas',
      icono: <BiCalendarWeek className="mx-2 size-5" />,
      texto: 'Semanas',
      isExpandSidebar,
    },
    {
      to: 'turnos',
      icono: <IoIosTimer className="mx-2 size-5" />,
      texto: 'Turnos',
      isExpandSidebar,
    },
    {
      to: 'planillas',
      icono: <TbFileSpreadsheet className="mx-2 size-5" />,
      texto: 'Planillas',
      isExpandSidebar,
    },
  ];
  return (
    <nav
      className={`relative h-full w-64 bg-blanco transition-all duration-500 ${isExpandSidebar ? 'p-3' : 'w-[3rem] p-1'}`}
    >
      <div
        onClick={() => dispatch(toggleSidebar())}
        className="absolute -right-4 top-[47%] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-primario bg-blanco transition-opacity duration-300 hover:opacity-100"
      >
        {isExpandSidebar ? (
          <MdKeyboardArrowLeft className="text-primario" />
        ) : (
          <MdKeyboardArrowRight className="text-primario" />
        )}
      </div>
      <div
        className={`mb-2 flex max-w-full flex-col items-center justify-center border-b-2 border-b-negro pb-4 transition-all ${isExpandSidebar ? '' : 'pt-4'}`}
      >
        <img
          src={logo}
          className={`transition-all ${isExpandSidebar ? 'max-w-[6.5625rem]' : 'max-w-[40px]'}`}
          alt="Logo de Servicios Generales Venancio"
        />
        <span
          className={`font-semibold text-primario transition-all duration-500 ${isExpandSidebar ? '' : 'text-[0px]'}`}
        >
          HACATE
        </span>
        <span
          className={`font-medium text-primario transition-all duration-500 ${isExpandSidebar ? '' : 'text-[0px]'}`}
        >
          Confianza y Compromiso
        </span>
      </div>
      <section className="flex h-full flex-col text-smallText text-negro">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            icono={link.icono}
            texto={link.texto}
            isExpandSidebar={isExpandSidebar}
          />
        ))}
      </section>
    </nav>
  );
};
// w-64
