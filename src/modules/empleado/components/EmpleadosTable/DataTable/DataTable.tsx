import React, { ReactNode } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
  Spinner,
} from '@nextui-org/react';
import { VerticalDotsIcon } from '../../../../ui/components/VerticalDotsIcon/VerticalDotsIcon';
import { Empleado } from '../../../types/Empleado';
import { Column } from '../../../types/Column';
import { InitialVisibleColumns } from '../../../types/InitialColumns';
import { STATUSOPTIONS } from '../../../const/statusOptions';
import { useNavigate } from 'react-router-dom';
import {
  IoIosCloseCircleOutline,
  IoMdCheckmarkCircleOutline,
} from 'react-icons/io';
import { TopContent } from './TopContent/TopContent';

const statusColorMap: Record<string, ChipProps['color']> = {
  activo: 'success',
  pausado: 'danger',
  vacaciones: 'warning',
  inactivo: 'default',
};

type DataTableProps = {
  users: Empleado[];
  columns: Column[];
  initialVisibleColunms: InitialVisibleColumns[];
  statusOptions: (typeof STATUSOPTIONS)[0][];
  isLoading: boolean;
};

export const DataTable = ({
  users: urs,
  columns: col,
  initialVisibleColunms,
  statusOptions: staOpt,
  isLoading,
}: DataTableProps) => {
  const users = urs.map((u) => ({
    ...u,
    cargo: u.cargo.nombre,
    asegurado: u.asegurado ? (
      <IoMdCheckmarkCircleOutline className="size-5 text-success" />
    ) : (
      <IoIosCloseCircleOutline className="size-5 text-danger" />
    ),
  }));

  type User = (typeof users)[0];

  const columns = col.map((c) => ({ ...c, uid: c.name.toLowerCase() }));

  const statusOptions = staOpt.map((s) => ({
    ...s,
    uid: s.name.toLocaleLowerCase(),
  }));

  const loadingState = isLoading ? 'loading' : 'idle';

  const navigate = useNavigate();

  const handleRowClick = (id: string) => navigate(`/empleados/${id}`);

  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(initialVisibleColunms),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: 'apellidos',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.nombres.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.apellidos.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== 'all' &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.estado),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: User, b: User) => {
      const first = a[sortDescriptor.column as keyof User] as number;
      const second = b[sortDescriptor.column as keyof User] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === 'descending' ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case 'nombres':
        return (
          <User
            avatarProps={{
              radius: 'full',
              size: 'sm',
              src: undefined,
            }} //!pendiente corregir del avatar
            classNames={{
              description: 'text-default-500',
            }}
            className="justify-start max-md:min-w-[140px]"
            description={user.apellidos}
            name={cellValue as ReactNode}
          >
            {user.apellidos}
          </User>
        );

      case 'estado':
        return (
          <Chip
            className="gap-1 border-none capitalize text-default-600"
            color={statusColorMap[user.estado]}
            size="sm"
            variant="dot"
          >
            {cellValue as ReactNode}
          </Chip>
        );
      case 'opciones':
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown className="border-1 border-default-200 bg-background">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>Ver</DropdownItem>
                <DropdownItem>Editar</DropdownItem>
                <DropdownItem>Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const topContent = React.useMemo(
    () => (
      <TopContent
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        statusOptions={statusOptions}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        columns={columns}
        usersCount={users.length}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    ),
    [
      filterValue,
      statusFilter,
      visibleColumns,
      onSearchChange,
      onRowsPerPageChange,
      users.length,
      hasSearchFilter,
    ],
  );

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-center px-2 py-2">
        <Pagination
          showControls
          classNames={{
            cursor: 'bg-foreground text-background',
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === 'all'
            ? 'Todos los items seleccionados'
            : `${selectedKeys.size} de ${items.length} seleccionados`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      // wrapper: ['max-h-[382px]', 'max-w-3xl'],
      th: ['bg-transparent', 'text-default-500', 'border-b', 'border-divider'],
      td: [
        // changing the rows border radius
        // first
        'group-data-[first=true]:first:before:rounded-none',
        'group-data-[first=true]:last:before:rounded-none',
        // middle
        'group-data-[middle=true]:before:rounded-none',
        // last
        'group-data-[last=true]:first:before:rounded-none',
        'group-data-[last=true]:last:before:rounded-none',
      ],
    }),
    [],
  );

  return (
    <Table
      // removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      checkboxesProps={{
        classNames: {
          wrapper: 'after:bg-foreground after:text-background text-background',
        },
      }}
      // classNames={classNames}
      shadow="none"
      className="max-md:overflow-auto max-md:overflow-y-hidden"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
      onRowAction={(key) => handleRowClick(key as string)}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        loadingState={loadingState}
        loadingContent={<Spinner label="Cargando..." className="mt-10" />}
        emptyContent={'No hay empleados'}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id} className="cursor-pointer">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey) as ReactNode}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
