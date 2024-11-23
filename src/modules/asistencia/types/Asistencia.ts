import { EstadoAsisteciaTypes } from '../enums/EstadoAsistenciaTypes';

export type Asistencia = {
  id: string;
  empleado: string;
  semana: string;
  estado: EstadoAsisteciaTypes;
  minutosExtras: number;
  minutosAtrasadas: number;
  observaciones: string;
  fecha: Date;
  fechaModificacion: Date;
};
