import { Empleado } from './Empleado';

export type FormFieldsCreateEmpleado = Omit<
  Empleado,
  'id' | 'examenMedico' | 'estado' | 'cargo' | 'dni' | 'edad' | 'celular'
> & { cargo: string; dni: string; edad: string; celular: string };
