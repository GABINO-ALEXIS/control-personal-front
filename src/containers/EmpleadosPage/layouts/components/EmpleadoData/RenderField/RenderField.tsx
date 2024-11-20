import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IDENTIFIERS_FIELDS } from '../../../../const/identifiersFields';
import { VALIDATE_FIELDS } from '../../../../const/validateFields';
import { FormFields } from '../../../../types/FormFields';
import { DateInput, Input, Select, SelectItem } from '@nextui-org/react';
import { CalendarDate, parseDate } from '@internationalized/date';
import { removeAccents } from '../../../../../../global/utils/removeAccents';

type RenderField = {
  input: {
    type: {
      typeMain: string | undefined;
      typePropInput?: string;
    };
    options?: {
      itemsArray?: { key: string; label: string }[];
    };
  };
  register: UseFormRegister<FormFields>;
  setValue: UseFormSetValue<FormFields>;
  errors: FieldErrors<FormFields>;
  label: string;
  value?: string | number;
  subLabel?: string;
  subValue?: string;
};

let count = 0;
export const RenderField = ({
  input,
  errors,
  register,
  setValue,
  label,
  value,
  subLabel,
  subValue,
}: RenderField) => {
  const { typeMain = 'input' } = input.type;
  const typePropInput = input.type.typePropInput;
  const itemsArray = input.options?.itemsArray || [];
  const newValue = subValue ? subValue : value;

  const identifierField =
    subLabel && subValue
      ? (`${removeAccents(label.toLowerCase())}.${IDENTIFIERS_FIELDS[removeAccents(label)][subLabel]}` as any)
      : IDENTIFIERS_FIELDS[label];

  const newRegister =
    subLabel && subValue
      ? {
          ...register(
            identifierField,
            VALIDATE_FIELDS[removeAccents(label)][subLabel](subValue),
          ),
        }
      : {
          ...register(identifierField, VALIDATE_FIELDS[label](value)),
        };

  const isInvalid = subLabel
    ? (errors as any)[identifierField.split('.')[0]]
    : (errors as any)[identifierField];

  switch (typeMain) {
    case 'select':
      return (
        <Select
          isRequired
          isInvalid={Boolean(isInvalid)}
          errorMessage={isInvalid ? isInvalid.message : undefined}
          label="Seleccione una opción"
          placeholder="Seleccionar"
          defaultSelectedKeys={(() => {
            setValue(identifierField, newValue);
            return [(newValue as string).toLowerCase()];
          })()}
          onSelectionChange={(keys) => {
            const labelSelected = itemsArray.filter(
              (e) => e.key === Array.from(keys)[0],
            )[0]?.label;
            setValue(identifierField, labelSelected);
          }}
          className="max-w-xs"
        >
          {itemsArray.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      );
    case 'dateInput':
      count = 0;
      return (
        <DateInput
          label={'Nuevo Valor'}
          isRequired
          isInvalid={Boolean(isInvalid)}
          errorMessage={isInvalid ? isInvalid.message : undefined}
          onChange={(value) => {
            count += 1;
            if (!value) {
              setValue(identifierField, undefined);
              return;
            }
            const { year, month, day } = value;

            if (year > new Date().getFullYear()) {
              setValue(identifierField, 'yearInvalidHigher' as any);
            } else if (year.toString().length === 4) {
              setValue(
                identifierField,
                new Date(year, month > 0 ? month - 1 : month, day),
              );
            } else {
              setValue(identifierField, 'yearInvalid' as any);
            }
          }}
          defaultValue={(() => {
            if (count < 1) setValue(identifierField, newValue);
            const [day, month, year] = (newValue as string).split('/');
            return parseDate(`${year}-${month}-${day}`);
          })()}
          placeholderValue={new CalendarDate(1995, 11, 6)}
        />
      );
    default:
      return (
        <Input
          {...newRegister}
          isRequired
          isInvalid={Boolean(isInvalid)}
          errorMessage={
            subLabel
              ? isInvalid
                ? isInvalid[identifierField.split('.')[1]]?.message
                : isInvalid
              : isInvalid
                ? isInvalid.message
                : undefined
          }
          // errorMessage={isInvalid ? isInvalid.message : undefined}
          type={typePropInput || 'text'}
          defaultValue={(newValue as string).toString()}
          label={subLabel ? subLabel : 'Nuevo Valor'}
          size="sm"
          variant="bordered"
        />
      );
  }
};
