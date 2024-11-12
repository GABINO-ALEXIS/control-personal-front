import { Cargotype } from '../enums/cargo-type';

export type Cargo = {
  id: string;
  nombre: Cargotype;
  salarioSemanal: number;
};
