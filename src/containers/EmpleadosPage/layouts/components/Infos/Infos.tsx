import { Cargotype } from '../../../../../modules/cargo/enums/cargo-type';
import { ExamenMedico } from '../../../../../modules/empleado/types/ExamenMedico';
import { InfoCard } from '../../../../../modules/ui/components/InfoCard/InfoCard';

type InfosProps = {
  cargoNombre: Cargotype;
  asegurado: boolean;
  examenMedico: ExamenMedico | null;
};

export const Infos = ({ cargoNombre, asegurado, examenMedico }: InfosProps) => {
  return (
    <>
      <div className="flex flex-auto justify-center p-1">
        <InfoCard text={cargoNombre} subText={{ months: 3 }} />
      </div>
      <div className="flex flex-auto justify-center p-1">
        <InfoCard
          text={'Asegurado'}
          subText={asegurado}
          className="bg-green-100 text-green-500"
        />
      </div>
      {examenMedico && (
        <div className="flex flex-auto justify-center p-1">
          <InfoCard
            text={'Alta'}
            subText={examenMedico.alta}
            className="bg-yellow-100 text-yellow-500"
          />
        </div>
      )}
    </>
  );
};
