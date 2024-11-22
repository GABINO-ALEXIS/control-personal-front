import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Selection,
  useDisclosure,
} from '@nextui-org/react';
import { SearchIcon } from '../../../../../ui/components/SearchIcon/SearchIcon';
import { ChevronDownIcon } from '../../../../../ui/components/ChevronDownIcon/ChevronDownIcon';
import { PlusIcon } from '../../../../../ui/components/PlusIcon/PlusIcon';
import { capitalize } from '../../../../../../global/utils/capitalize';
import { Dispatch, lazy, SetStateAction, Suspense } from 'react';
import { Empleado } from '../../../../types/Empleado';
const CrearEmpleadoModal = lazy(
  () => import('../../CrearEmpleadoModal/CrearEmpleadoModal'),
);

type TopContentProps = {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
  onSearchChange: () => void;
  statusFilter: Selection;
  setStatusFilter: Dispatch<SetStateAction<Selection>>;
  statusOptions: {
    uid: string;
    name: string;
  }[];
  visibleColumns: Selection;
  setVisibleColumns: Dispatch<SetStateAction<Selection>>;
  columns: {
    uid: string;
    name: Uppercase<keyof Empleado> | 'OPCIONES';
    sortable?: boolean;
  }[];
  usersCount: number;
  onRowsPerPageChange: any;
};

export const TopContent = ({
  filterValue,
  setFilterValue,
  onSearchChange,
  statusFilter,
  setStatusFilter,
  statusOptions,
  visibleColumns,
  setVisibleColumns,
  columns,
  usersCount,
  onRowsPerPageChange,
}: TopContentProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-end justify-between gap-3">
        <Input
          isClearable
          classNames={{
            base: 'w-full sm:max-w-[44%]',
            inputWrapper: 'border-1',
          }}
          placeholder="Buscar empleado..."
          size="sm"
          startContent={<SearchIcon className="text-default-300" />}
          value={filterValue}
          variant="bordered"
          onClear={() => setFilterValue('')}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Estado
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                endContent={<ChevronDownIcon className="text-small" />}
                size="sm"
                variant="flat"
              >
                Columnas
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button
            onClick={onOpen}
            className="bg-foreground text-background"
            endContent={<PlusIcon />}
            size="sm"
          >
            Agregar Empleado
          </Button>
          {isOpen && (
            <Suspense>
              <CrearEmpleadoModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </Suspense>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-small text-default-400">
          Total {usersCount} empleados
        </span>
        <label className="flex items-center text-small text-default-400">
          Filas por pagina:
          <select
            className="bg-transparent text-small text-default-400 outline-none"
            onChange={onRowsPerPageChange}
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
};
