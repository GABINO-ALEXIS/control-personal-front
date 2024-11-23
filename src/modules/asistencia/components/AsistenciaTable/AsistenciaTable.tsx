import { ReactNode, useCallback } from 'react';
import {
  Chip,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import { EstadoAsistencia } from './EstadoAsistencia/EstadoAsistencia';
import { COLUMNS } from '../../const/columns';
import { useGetEmpleadosQuery } from '../../../empleado/services/empleadoApiSlice';
import { Error } from '../../../ui/components/Error/Error';

export const AsistenciaTable = () => {
  const {
    data: empleados = [],
    isLoading,
    isError,
    error,
  } = useGetEmpleadosQuery({});
  if (isError) return <Error error={error} />;

  const loadingState = isLoading ? 'loading' : 'idle';
  type User = (typeof empleados)[0];

  const renderCell = useCallback((empleado: User, columnKey: React.Key) => {
    const cellValue = empleado[columnKey as keyof User];

    switch (columnKey) {
      case 'empleado':
        return (
          <User
            avatarProps={{ src: undefined }}
            name={`${empleado.nombres} ${empleado.apellidos}`}
          />
        );
      case 'puntuacion':
        return (
          <div className="flex flex-col">
            <Chip color="warning" variant="bordered">
              {empleado.dni}
            </Chip>
          </div>
        );
      case 'estado':
        return <EstadoAsistencia empleadoId={empleado.id} />;
      default:
        return cellValue;
    }
  }, []);

  return (
    <section className="h-full w-full">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={COLUMNS}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={empleados}
          loadingState={loadingState}
          loadingContent={<Spinner label="Cargando..." className="mt-10" />}
          emptyContent={'No hay empleados'}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {renderCell(item, columnKey) as ReactNode}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  );
};
