import { Asistencia } from './Asistencia';

export type CreateAsistenciaMutation = Pick<
  Asistencia,
  'empleado' | 'semana' | 'estado'
> & {
  minutosExtras?: number;
  minutosAtrasadas?: number;
  observaciones?: string;
};
