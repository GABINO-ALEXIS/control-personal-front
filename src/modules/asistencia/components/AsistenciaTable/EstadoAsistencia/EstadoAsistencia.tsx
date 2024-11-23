import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from '@nextui-org/react';
import React, { Key } from 'react';
import { STATUSCOLORMAP } from '../../../const/status-color-map';
import { useCreateAsistenciaMutation } from '../../../services/asistenciaApiSlice';
import { EstadoAsisteciaTypes } from '../../../enums/EstadoAsistenciaTypes';

type EstadoAsistenciaProps = {
  empleadoId: string;
};

export const EstadoAsistencia = ({ empleadoId }: EstadoAsistenciaProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(['Pendiente']),
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys],
  );

  const [
    createAsistencia,
    { isLoading: isCreating, isSuccess, isError, error },
  ] = useCreateAsistenciaMutation();

  const crearAsistencia = async (estadoAsistencia: Key) => {
    const asistencia = {
      empleado: empleadoId,
      estado: estadoAsistencia as EstadoAsisteciaTypes,
      semana: '671abedf575f08acdc5cdfcf',
    };
    await createAsistencia(asistencia);
  };

  console.log({ isLoading: isCreating, isSuccess, isError, error });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          color={STATUSCOLORMAP[selectedValue] || 'default'}
          className={`h-8 bg-${STATUSCOLORMAP[selectedValue] || 'default'}-50 capitalize`}
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        variant="flat"
        onAction={crearAsistencia}
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
