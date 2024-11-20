import { Cargotype } from '../../../modules/cargo/enums/cargo-type';

export type CargoOption = {
  key: Lowercase<Cargotype>;
  label: Cargotype;
};
