import { Error } from '../../../ui/components/Error/Error';
import { COLUMNS } from '../../const/columns';
import { INITIAL_VISIBLE_COLUMNS } from '../../const/initial-visible-colunms';
import { STATUSOPTIONS } from '../../const/statusOptions';
import { useGetEmpleadosQuery } from '../../services/empleadoApiSlice';
import { DataTable } from './DataTable/DataTable';

export const EmpleadosTable = () => {
  const {
    data: empleados = [],
    isLoading,
    error,
    isError,
  } = useGetEmpleadosQuery({});

  if (isError) return <Error error={error} />;

  return (
    <DataTable
      isLoading={isLoading}
      users={empleados}
      columns={COLUMNS}
      initialVisibleColunms={INITIAL_VISIBLE_COLUMNS}
      statusOptions={STATUSOPTIONS}
    />
  );
};
