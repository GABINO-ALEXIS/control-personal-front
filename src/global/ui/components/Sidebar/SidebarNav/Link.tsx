import React from 'react';
import { NavLink } from 'react-router-dom';

export type LinkType = {
  to: string;
  icono: React.ReactElement;
  texto: string;
  isExpandSidebar: boolean;
};

export const Link = ({ to, icono, texto, isExpandSidebar }: LinkType) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `flex items-center rounded-lg bg-primario ${isExpandSidebar ? 'py-3' : 'py-2'} text-blanco`
          : `flex items-center ${isExpandSidebar ? 'py-3' : 'py-2'} hover:font-semibold hover:text-primario`
      }
    >
      {icono}
      <span
        className={`overflow-hidden transition-all ${isExpandSidebar ? 'w-auto' : 'w-0'}`}
      >
        {texto}
      </span>
    </NavLink>
  );
};
