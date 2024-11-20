import { Empleado } from './Empleado';

export type FormFieldsCreateEmpleado = Omit<
  Empleado,
  'id' | 'estado' | 'examenMedico' | 'cargo'
> & {
  cargo: string;
};
