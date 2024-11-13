import { Empleado } from '../../../modules/empleado/types/Empleado';

export type FormFields = Partial<
  Omit<Empleado, 'id' | 'cargo' | 'estado' | 'asegurado' | 'examenMedico'>
>;
