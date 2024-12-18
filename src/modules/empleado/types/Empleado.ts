import { EstadoType } from '../enums/EstadoType';
import { Cargo } from '../../cargo/types/Cargo';
import { Direccion } from './Direccion';
import { ExamenMedico } from './ExamenMedico';
import { Sexo } from '../enums/Sexo';

export type Empleado = {
  id: string;
  dni: number;
  nombres: string;
  apellidos: string;
  edad: number;
  sexo: Sexo;
  fechaNacimiento: Date;
  direccion: Direccion;
  correo: string;
  celular: number;
  cargo: Cargo;
  estado: EstadoType;
  asegurado: boolean;
  examenMedico: ExamenMedico | null;
};
