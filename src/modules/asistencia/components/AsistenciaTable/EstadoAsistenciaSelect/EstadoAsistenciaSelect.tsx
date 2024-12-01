import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@nextui-org/react';
import { Key, useEffect, useMemo, useState } from 'react';
import { STATUSCOLORMAP } from '../../../const/status-color-map';
import {
  asistenciaApiSlice,
  useCreateAsistenciaMutation,
  useGetAsistenciasByEmpleadoEndDateQuery,
  useUpdateAsisitenciaMutation,
} from '../../../services/asistenciaApiSlice';
import { EstadoAsisteciaTypes } from '../../../enums/EstadoAsistenciaTypes';
import { useDispatch } from '../../../../../global/store/hooks';

type EstadoAsistenciaProps = {
  empleadoId: string;
};

export const EstadoAsistenciaSelect = ({
  empleadoId,
}: EstadoAsistenciaProps) => {
  const { data: asistencias = [], isLoading } =
    useGetAsistenciasByEmpleadoEndDateQuery({
      empleadoId,
      fechaInicio: '2024-11-24T02:02:05.245Z', //! verificar la fecha no funiona bien,con el new Date().toISOString()
    });

  const [selectedKeys, setSelectedKeys] = useState<Selection>(
    new Set(['Pendiente']),
  );

  const dispatch = useDispatch();
  const [createAsistencia, { isError }] = useCreateAsistenciaMutation();
  const [updateAsistencia] = useUpdateAsisitenciaMutation();

  const selectedValue = useMemo(() => {
    if (isError) return 'Error';
    return Array.from(selectedKeys).join(', ').replaceAll('_', ' ');
  }, [selectedKeys, isError]);

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

  const createAsistenciaOrUpdate = async (estadoAsistencia: Key) => {
    const asistenciaVerify = await verifyAsistenciaEmpleado(
      empleadoId,
      '2024-11-24T02:02:05.245Z',
    );

    if (asistenciaVerify) {
      await updateAsistencia({
        id: asistenciaVerify.id,
        estado: estadoAsistencia as EstadoAsisteciaTypes,
      });
      // dispatch(
      //   asistenciaApiSlice.util.updateQueryData(
      //     'getAsistenciasByEmpleadoEndDate',
      //     {
      //       empleadoId: asistenciaVerify.empleado,
      //       fechaInicio: '2024-11-24T02:02:05.245Z',
      //     },
      //     (draft) => {
      //       const asistencia = draft.find((a) => a.id === asistenciaVerify.id);
      //       if (asistencia) {
      //         asistencia.estado = estadoAsistencia as EstadoAsisteciaTypes;
      //       }
      //     },
      //   ),
      // );
    } else {
      const asistencia = {
        empleado: empleadoId,
        estado: estadoAsistencia as EstadoAsisteciaTypes,
        semana: '671abedf575f08acdc5cdfcf',
      };
      await createAsistencia(asistencia);

      // dispatch(
      //   asistenciaApiSlice.util.updateQueryData(
      //     'getAsistenciasByEmpleadoEndDate',
      //     {
      //       empleadoId: empleadoId,
      //       fechaInicio: '2024-11-24T02:02:05.245Z',
      //     },
      //     (draft) => {
      //       draft.push(asistencia as Asistencia);
      //     },
      //   ),
      // );
    }
  };
  useEffect(() => {
    if (asistencias.length > 0 && asistencias[0].estado) {
      setSelectedKeys(new Set([asistencias[0].estado]));
    }
  }, [asistencias]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isLoading={isLoading}
          variant="bordered"
          color={STATUSCOLORMAP[selectedValue] || 'default'}
          className={`h-8 capitalize ${STATUSCOLORMAP[selectedValue] ? `bg-${STATUSCOLORMAP[selectedValue]}-50` : 'text-gray-400'}`}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        onAction={createAsistenciaOrUpdate}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="presente">Presente</DropdownItem>
        <DropdownItem key="tarde">Tarde</DropdownItem>
        <DropdownItem key="justificado">Justificado</DropdownItem>
        <DropdownItem key="ausente">Ausente</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
