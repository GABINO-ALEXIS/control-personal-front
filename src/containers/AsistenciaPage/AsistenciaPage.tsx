import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { Page } from '../../global/ui/components/Page/Page';
import { AsistenciaTable } from '../../modules/asistencia/components/AsistenciaTable/AsistenciaTable';
import { AsistenciaDay } from '../../modules/asistencia/components/AsistenciaDay/AsistenciaDay';

const AsistenciaPage = () => {
  return (
    <Page>
      <div className="h-full w-full bg-pink-700">
        <Tabs aria-label="Options" className="ml-1 bg-yellow-600">
          <Tab key="asistencia de hoy" title="Asistencia del Día">
            <AsistenciaDay />
          </Tab>
          <Tab key="registro de asistencias" title="Registro de Asistencias">
            <AsistenciaTable />
          </Tab>
        </Tabs>
      </div>
    </Page>
  );
};

export default AsistenciaPage;
