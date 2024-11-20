import { Sexo } from '../../../modules/empleado/enums/Sexo';

const ERROR_EQUAL_VALUE =
  'El valor del campo no puede ser el mismo, ingrese un nuevo valor';

let departamentoSubLabelValue: string;
let departamentoValue: string;
let provinciaSubLabelValue: string;
let provinciaValue: string;
let distritoSubLabelValue: string;
let distritoValue: string;

export const VALIDATE_FIELDS: any = {
  DNI: (labelValue: number) => ({
    required: 'El DNI es obligatorio',
    validate: (value: string) => {
      if ((labelValue ? labelValue.toString() : labelValue) === value)
        return ERROR_EQUAL_VALUE;
    },
    pattern: {
      value: /^[0-9]{8}$/,
      message: 'DNI Inválido: debe contener exactamente 8 dígitos',
    },
  }),
  Nombres: (labelValue: string) => ({
    required: 'El nombre es obligatorio',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
    },
    minLength: {
      value: 3,
      message: 'Los nombres deben tener al menos 3 caracteres',
    },
    maxLength: {
      value: 20,
      message: 'Los nombres no deben exceder los 20 caracteres',
    },
  }),
  Apellidos: (labelValue: string) => ({
    required: 'El apellido es obligatorio',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
    },
    minLength: {
      value: 3,
      message: 'Los apellidos deben tener al menos 3 caracteres',
    },
    maxLength: {
      value: 20,
      message: 'Los apellidos no deben exceder los 20 caracteres',
    },
  }),
  Edad: (labelValue: number) => ({
    required: 'La edad es obligatoria',
    validate: (value: string) => {
      if ((labelValue ? labelValue.toString() : labelValue) === value)
        return ERROR_EQUAL_VALUE;
      if (!Number.isInteger(Number(value)))
        return 'Solo se permiten números enteros';
    },
    min: {
      value: 18,
      message: 'La edad mínima es de 18 años',
    },
    max: {
      value: 99,
      message: 'La edad máxima es de 99 años',
    },
  }),
  Sexo: (labelValue: Sexo) => ({
    required: 'El sexo es obligatorio',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
    },
  }),
  'Fecha de Nacimiento': (labelValue: string) => ({
    required: 'La fecha de nacimiento es obligatoria',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
      if (value === 'yearInvalid')
        return 'Fecha Inválida, seleccione correctamente el año';
      if (value === 'yearInvalidHigher')
        return 'Fecha Inválida, el año no puede ser mayor a la actual';
    },
  }),
  Correo: (labelValue: string) => ({
    required: 'El correo es obligatorio',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      message: 'Formato de correo inválido',
    },
  }),
  Celular: (labelValue: number) => ({
    required: 'El número de celular es obligatorio',
    validate: (value: string) => {
      if ((labelValue ? labelValue.toString() : labelValue) === value)
        return ERROR_EQUAL_VALUE;
    },
    pattern: {
      value: /^9\d{8}$/,
      message: 'El número de celular debe comenzar con 9 y tener 9 dígitos',
    },
  }),
  Direccion: {
    Departamento: (subLabelValue: string) => ({
      required: 'El departamento es obligatorio',
      validate: (value: string) => {
        departamentoSubLabelValue = subLabelValue;
        departamentoValue = value;
      },
    }),
    Provincia: (subLabelValue: string) => ({
      required: 'La provincia es obligatoria',
      validate: (value: string) => {
        provinciaSubLabelValue = subLabelValue;
        provinciaValue = value;
      },
    }),
    Distrito: (subLabelValue: string) => ({
      required: 'El distrito es obligatorio',
      validate: (value: string) => {
        distritoSubLabelValue = subLabelValue;
        distritoValue = value;
      },
    }),
    Domicilio: (subLabelValue: string) => ({
      required: 'El domicilio es obligatorio',
      validate: (value: string) => {
        if (
          subLabelValue === value &&
          departamentoSubLabelValue === departamentoValue &&
          provinciaSubLabelValue === provinciaValue &&
          distritoSubLabelValue === distritoValue
        )
          return 'La dirección sigue siendo la misma';
      },
      minLength: {
        value: 8,
        message: 'El domicilio debe tener al menos 8 caracteres',
      },
      maxLength: {
        value: 60,
        message: 'El domicilio no debe exceder los 60 caracteres',
      },
    }),
  },
} as const;
