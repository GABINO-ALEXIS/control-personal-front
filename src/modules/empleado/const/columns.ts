import { Column } from '../types/Column';

export const COLUMNS: Column[] = [
  { name: 'NOMBRES', sortable: true },
  { name: 'CORREO' },
  { name: 'CARGO', sortable: true },
  { name: 'DNI' },
  { name: 'ESTADO', sortable: true },
  { name: 'ASEGURADO', sortable: true },
  { name: 'CELULAR' },
  { name: 'EDAD', sortable: true },
  { name: 'FECHANACIMIENTO', sortable: true },
  { name: 'OPCIONES' },
] as const;
