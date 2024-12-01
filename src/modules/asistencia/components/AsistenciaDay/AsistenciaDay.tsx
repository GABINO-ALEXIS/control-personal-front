import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from '@nextui-org/react';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { useGetEmpleadosQuery } from '../../../empleado/services/empleadoApiSlice';
import { Error } from '../../../ui/components/Error/Error';
import { LuCheck } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';
import { PiClockAfternoonBold } from 'react-icons/pi';
import { TbFileCheck } from 'react-icons/tb';
import {
  asistenciaApiSlice,
  useCreateAsistenciaMutation,
  useUpdateAsisitenciaMutation,
} from '../../services/asistenciaApiSlice';
import { EstadoAsisteciaTypes } from '../../enums/EstadoAsistenciaTypes';
import { useDispatch } from '../../../../global/store/hooks';
import { EstadoAsistenciaBoton } from './EstadoAsistenciaBoton/EstadoAsistenciaBoton';

type Props = {};

export const AsistenciaDay = (props: Props) => {
  const {
    data: empleados = [],
    isLoading,
    isError,
    error,
  } = useGetEmpleadosQuery({});
  const [createAsistencia, { isError: isErrorCreateAsistencia, isSuccess }] =
    useCreateAsistenciaMutation();
  const [updateAsistencia] = useUpdateAsisitenciaMutation();

  const dispatch = useDispatch();
  const [selectedStates, setSelectedStates] = useState<Record<string, string>>(
    {},
  );
  const [lastStateEmpleado, setLastStateEmpleado] = useState<{
    empleadoId: string;
    estado: string;
  } | null>(null);

  if (isError) return <Error error={error} />;

  const loadingState = isLoading ? 'loading' : 'idle';

  const verifyAsistenciaEmpleado = async (
    empleadoId: string,
    fecha: string,
  ) => {
    const { data = [] } = await dispatch(
      asistenciaApiSlice.endpoints.getAsistenciasByEmpleadoEndDate.initiate({
        empleadoId,
        fechaInicio: fecha,
      }),
    );
    return data[0] ? data[0] : null;
  };

  const handleSelection = (empleadoId: string, estado: string) => {
    setSelectedStates((prev) => ({
      ...prev,
      [empleadoId]: estado,
    }));
    setLastStateEmpleado({ empleadoId, estado });
  };

  type User = (typeof empleados)[0];

  const renderCell = useCallback((empleado: User, columnKey: React.Key) => {
    const cellValue = empleado[columnKey as keyof User];

    const currentSelection = selectedStates[empleado.id];

    switch (columnKey) {
      case 'empleado':
        return (
          <User
            avatarProps={{ src: undefined }}
            name={`${empleado.nombres} ${empleado.apellidos}`}
          />
        );
      case 'presente':
        return (
          <EstadoAsistenciaBoton
            onClick={() => handleSelection(empleado.id, 'presente')}
            icon={LuCheck}
            estadoText="Presente"
            className="hover:text-success-400"
            ss={selectedStates}
          />
        );
      case 'tarde':
        return (
          <EstadoAsistenciaBoton
            onClick={() => handleSelection(empleado.id, 'tarde')}
            icon={PiClockAfternoonBold}
            estadoText="Tarde"
            className="hover:text-warning-400"
          />
        );
      case 'ausente':
        return (
          <EstadoAsistenciaBoton
            onClick={() => handleSelection(empleado.id, 'ausente')}
            icon={IoClose}
            estadoText="Ausente"
            className="hover:text-danger-400"
          />
        );
      case 'justificado':
        return (
          <EstadoAsistenciaBoton
            onClick={() => handleSelection(empleado.id, 'justificado')}
            icon={TbFileCheck}
            estadoText="Justificado"
            className="hover:text-secondary-400"
          />
        );
      default:
        return cellValue;
    }
  }, []);
  console.log({ selectedStates });

  useEffect(() => {
    if (!lastStateEmpleado) return;

    const createAsistenciaOrUpdate = async () => {
      const { empleadoId, estado } = lastStateEmpleado;

      const asistenciaVerify = await verifyAsistenciaEmpleado(
        empleadoId,
        '2024-12-01T03:26:38.925Z',
      );

      if (asistenciaVerify) {
        await updateAsistencia({
          id: asistenciaVerify.id,
          estado: estado as EstadoAsisteciaTypes,
        });
      } else {
        const asistencia = {
          empleado: empleadoId,
          estado: estado as EstadoAsisteciaTypes,
          semana: '671abedf575f08acdc5cdfcf',
        };
        await createAsistencia(asistencia);
      }
    };

    // createAsistenciaOrUpdate();
  }, [lastStateEmpleado]);

  return (
    <section className="h-full w-full">
      <Table aria-label="Example table with custom cells">
        <TableHeader
          columns={[
            { name: 'EMPLEADO', uid: 'empleado' },
            { name: 'PRESENTE', uid: 'presente' },
            { name: 'TARDE', uid: 'tarde' },
            { name: 'AUSENTE', uid: 'ausente' },
            { name: 'JUSTIFICADO', uid: 'justificado' },
          ]}
        >
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
            <TableRow key={item.id} className="hover:bg-default-100">
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
