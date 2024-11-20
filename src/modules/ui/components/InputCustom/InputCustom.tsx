import { Input, InputProps } from '@nextui-org/react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormFieldsCreateEmpleado } from '../../../empleado/types/FormFieldsCreateEmpleado';
import { VALIDATE_FIELDS } from '../../../../containers/EmpleadosPage/const/validateFields';
import { IDENTIFIERS_FIELDS } from '../../../../containers/EmpleadosPage/const/identifiersFields';
import { removeAccents } from '../../../../global/utils/removeAccents';

type InputCustomProps = InputProps & {
  label: string;
  register: UseFormRegister<FormFieldsCreateEmpleado>;
  errors: FieldErrors<FormFieldsCreateEmpleado>;
  labelObject?: string;
};

export const InputCustom = ({
  label,
  register,
  errors,
  labelObject,
  ...props
}: InputCustomProps) => {
  const identifierField = labelObject
    ? (`${removeAccents(labelObject.toLowerCase())}.${IDENTIFIERS_FIELDS[removeAccents(labelObject)][label]}` as any)
    : IDENTIFIERS_FIELDS[label];

  const newRegister = labelObject
    ? {
        ...register(
          identifierField,
          VALIDATE_FIELDS[removeAccents(labelObject)][label](),
        ),
      }
    : {
        ...register(identifierField, VALIDATE_FIELDS[label]()),
      };

  const errorFields = labelObject
    ? (errors as any)[identifierField.split('.')[0]]
    : (errors as any)[identifierField];

  return (
    <Input
      {...newRegister}
      isRequired
      isInvalid={Boolean(errorFields)}
      errorMessage={
        labelObject
          ? errorFields
            ? errorFields[identifierField.split('.')[1]]?.message
            : errorFields
          : errorFields
            ? errorFields.message
            : undefined
      }
      label={label}
      variant="bordered"
      size="sm"
      {...props}
    />
  );
};
