import { Empleado } from './Empleado';

export type Column = {
  name: Uppercase<keyof Empleado> | 'OPCIONES';
  sortable?: boolean;
};
