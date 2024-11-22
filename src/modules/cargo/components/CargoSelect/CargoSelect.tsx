import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormFieldsCreateEmpleado } from '../../../empleado/types/FormFieldsCreateEmpleado';
import { Select, SelectItem } from '@nextui-org/react';
import { useGetCargosQuery } from '../../services/cargoApiSlice';

type CargoSelectProps = {
  control: Control<FormFieldsCreateEmpleado, any>;
  errors: FieldErrors<FormFieldsCreateEmpleado>;
};

export const CargoSelect = ({ control, errors }: CargoSelectProps) => {
  const { data: cargos = [], isError } = useGetCargosQuery({});

  const cargosOptions = isError
    ? []
    : cargos?.map((c) => ({ key: c.id, label: c.nombre }));

  return (
    <Controller
      name="cargo"
      control={control}
      rules={{ required: 'El Cargo es obligatorio' }}
      render={({ field }) => (
        <Select
          isDisabled={isError}
          items={cargosOptions}
          isInvalid={Boolean(errors['cargo'])}
          errorMessage={errors['cargo'] ? errors['cargo'].message : undefined}
          onSelectionChange={(keys) => {
            const keySelected = cargosOptions.filter(
              (e) => e.key === Array.from(keys)[0],
            )[0]?.key;
            field.onChange(keySelected);
          }}
          label="Cargo"
          variant="bordered"
          size="sm"
          isRequired
        >
          {(item) => (
            <SelectItem key={item.key} className="capitalize">
              {item.label}
            </SelectItem>
          )}
        </Select>
      )}
    />
  );
};
