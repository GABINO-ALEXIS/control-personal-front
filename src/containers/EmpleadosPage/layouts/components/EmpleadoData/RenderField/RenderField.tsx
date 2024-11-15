import { FieldErrors, UseFormRegister } from 'react-hook-form';
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
  errors: FieldErrors<FormFields>;
  label: string;
  value?: string | number;
  subLabel?: string;
  subValue?: string;
};

export const RenderField = ({
  input,
  errors,
  register,
  label,
  value,
  subLabel,
  subValue,
}: RenderField) => {
  const { typeMain = 'input' } = input.type;
  const typePropInput = input.type.typePropInput;
  const itemsArray = input.options?.itemsArray || [];
  const newValue = subValue ? subValue : value;

  const idetifierField =
    subLabel && subValue
      ? (`${removeAccents(label.toLowerCase())}.${IDENTIFIERS_FIELDS[removeAccents(label)][subLabel]}` as any)
      : IDENTIFIERS_FIELDS[label];

  const newRegister =
    subLabel && subValue
      ? {
          ...register(
            idetifierField,
            VALIDATE_FIELDS[removeAccents(label)][subLabel](subValue),
          ),
        }
      : {
          ...register(idetifierField, VALIDATE_FIELDS[label](value)),
        };

  const isInvalid = subLabel
    ? (errors as any)[idetifierField]
    : (errors as any)[idetifierField];

  switch (typeMain) {
    case 'select':
      return (
        <Select
          isRequired
          label="Seleccione una opción"
          placeholder="Seleccionar"
          defaultSelectedKeys={[(value as string).toLocaleLowerCase()]}
          className="max-w-xs"
        >
          {itemsArray.map((item) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      );
    case 'dateInput':
      return (
        <DateInput
          label={'Nuevo Valor'}
          isRequired
          defaultValue={(() => {
            const [day, month, year] = (value as string).split('/');
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
          errorMessage={isInvalid ? isInvalid.message : undefined}
          type={typePropInput || 'text'}
          defaultValue={(newValue as string).toString()}
          label="Nuevo Valor"
          size="sm"
          variant="bordered"
        />
      );
  }
};
