import { Cargotype } from '../enums/cargo-type';
import { InfoIcon } from '../types/InfoIcon';
import { FaHandsHelping } from 'react-icons/fa';
import { RiPaintBrushLine } from 'react-icons/ri';
import { LiaHardHatSolid } from 'react-icons/lia';
import { GiRank3 } from 'react-icons/gi';
import { MdOutlineSupervisedUserCircle } from 'react-icons/md';
import { MdOutlineCleanHands } from 'react-icons/md';
import { FiPackage } from 'react-icons/fi';
import { FaShieldAlt } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa';
import { LuFileCheck } from 'react-icons/lu';
import { AiOutlineFileExcel } from 'react-icons/ai';

export const INFO_ICONS: InfoIcon = {
  [Cargotype.Ayudante]: FaHandsHelping,
  [Cargotype.OperarioEmpastador]: FiPackage,
  [Cargotype.OperarioPintor]: RiPaintBrushLine,
  [Cargotype.OperarioCapataz]: LiaHardHatSolid,
  [Cargotype.OperarioOficial]: GiRank3,
  [Cargotype.Supervisor]: MdOutlineSupervisedUserCircle,
  [Cargotype.Limpieza]: MdOutlineCleanHands,
  Asegurado: FaShieldAlt,
  Alta: LuFileCheck,
  'No Asegurado': FaExclamationTriangle,
  'No Alta': AiOutlineFileExcel,
};
