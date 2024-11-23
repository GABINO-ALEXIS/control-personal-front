import { EstadoSemanaTypes } from './EstadoSemanaTypes';

export type Semana = {
  id: string;
  fechaInicio: Date;
  fechaFin: Date;
  numeroSemana: number;
  turno: string;
  estado: EstadoSemanaTypes;
};
