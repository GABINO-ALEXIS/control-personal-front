import { Section } from '../../modules/ui/components/Section/Section';
import { EmpleadosTable } from '../../modules/empleado/components/EmpleadosTable/EmpleadosTable';
import { Page } from '../../global/ui/components/Page/Page';

const EmpleadosPage = () => {
  return (
    <Page>
      <Section>
        <EmpleadosTable />
      </Section>
    </Page>
  );
};

export default EmpleadosPage;
