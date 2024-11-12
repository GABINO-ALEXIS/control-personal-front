import { ComponentType } from 'react';
import { Cargotype } from '../enums/cargo-type';

export type InfoIcon = {
  [key in
    | Cargotype
    | 'Asegurado'
    | 'No Asegurado'
    | 'Alta'
    | 'No Alta']: ComponentType<{
    className?: string;
  }>;
};
