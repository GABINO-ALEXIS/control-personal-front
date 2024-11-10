import { Checkbox } from '@nextui-org/react';
import { ExamenMedico as ExamenMedicoType } from '../../../../../modules/empleado/types/ExamenMedico';
import { SolAmount } from '../../../../../modules/ui/components/SolAmount/SolAmount';

type ExamenMedicoProps = {
  data: ExamenMedicoType | null | undefined;
};

export const ExamenMedico = ({ data }: ExamenMedicoProps) => {
  return (
    <>
      {data ? (
        <ul>
          <li className="my-2 flex justify-between">
            <span>Fecha:</span>
            <span>{JSON.stringify(data.fecha)}</span>
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
