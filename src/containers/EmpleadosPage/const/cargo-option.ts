import { Cargotype } from '../../../modules/cargo/enums/cargo-type';
import { CargoOption } from '../types/CargoOption';

export const CARGO_OPTION: CargoOption[] = [
  { key: 'supervisor', label: Cargotype.Supervisor },
  { key: 'operario capataz', label: Cargotype.OperarioCapataz },
  { key: 'operario empastador', label: Cargotype.OperarioEmpastador },
  { key: 'operario oficial', label: Cargotype.OperarioOficial },
  { key: 'operario pintor', label: Cargotype.OperarioPintor },
  { key: 'ayudante', label: Cargotype.Ayudante },
  { key: 'limpieza', label: Cargotype.Limpieza },
];
