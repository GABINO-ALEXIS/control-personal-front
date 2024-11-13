import { Checkbox } from '@nextui-org/react';
import { ExamenMedico as ExamenMedicoType } from '../../../../../modules/empleado/types/ExamenMedico';
import { SolAmount } from '../../../../../modules/ui/components/SolAmount/SolAmount';
import { format } from '@formkit/tempo';

type SeccionExamenMedicoProps = {
  data: ExamenMedicoType | null;
};

export const SeccionExamenMedico = ({ data }: SeccionExamenMedicoProps) => {
  return (
    <>
      {data ? (
        <ul>
          <li className="my-2 flex justify-between">
            <span>Fecha:</span>
            <span>{format(new Date(), 'full')}</span>
          </li>
          <li className="my-2 flex justify-between">
            <span>Monto Gastado:</span>
            <SolAmount monto={data.montoGastado} />
          </li>
          <li className="my-2 flex justify-between">
            <Checkbox isSelected={data.alta}>Alta</Checkbox>
          </li>
        </ul>
      ) : (
        <div>No hay Examen Médico</div>
      )}
    </>
  );
};
