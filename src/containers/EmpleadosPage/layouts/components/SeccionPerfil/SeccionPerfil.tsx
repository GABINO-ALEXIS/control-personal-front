import { Tab, Tabs } from '@nextui-org/react';
import { Section } from '../../../../../modules/ui/components/Section/Section';
import { Infos } from '../Infos/Infos';
import { Profile } from '../Profile/Profile';
import { SeccionExamenMedico } from '../SeccionExamenMedico/SeccionExamenMedico';
import { SeccionConfiguracion } from '../SeccionConfiguracion/SeccionConfiguracion';
import { Empleado } from '../../../../../modules/empleado/types/Empleado';

type SeccionPerfilProps = {
  empleado: Empleado;
};

export const SeccionPerfil = ({ empleado }: SeccionPerfilProps) => {
  const { id, nombres, apellidos, cargo, examenMedico, asegurado } = empleado;

  return (
    <section className="flex h-full w-full gap-5 bg-primario max-md:block">
      <Profile {...empleado} />
      <div className="flex h-fit basis-full flex-wrap max-md:pt-3">
        <Infos
          cargoNombre={cargo.nombre}
          asegurado={asegurado}
          examenMedico={examenMedico}
        />
        <Section className="mt-5 flex flex-col">
          <Tabs
            aria-label="Options"
            color="primary"
            variant="underlined"
            classNames={{
              tabList:
                'gap-6 w-full relative rounded-none p-0 border-b border-divider',
              cursor: 'w-full bg-primario',
              tab: 'max-w-fit px-0 h-12',
              tabContent:
                'group-data-[selected=true]:text-primario group-data-[selected=true]:font-semibold',
            }}
          >
            <Tab key="examenMedico" title="Examen Médico" className="px-0 pb-0">
              <SeccionExamenMedico data={examenMedico} />
            </Tab>
            <Tab
              key="configuracion"
              title="Configuración"
              className="px-0 pb-0"
            >
              <SeccionConfiguracion
                empleadoId={id}
                nombres={nombres}
                apellidos={apellidos}
              />
            </Tab>
          </Tabs>
        </Section>
      </div>
    </section>
  );
};
