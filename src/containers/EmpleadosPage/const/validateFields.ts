import { Sexo } from '../../../modules/empleado/enums/Sexo';

const ERROR_EQUAL_VALUE =
  'El valor del campo no puede ser el mismo, ingrese un nuevo valor';

export const VALIDATE_FIELDS: any = {
  DNI: (labelValue: number) => ({
    required: 'El DNI es obligatorio',
    validate: (value: string) => {
      if (labelValue.toString() === value) return ERROR_EQUAL_VALUE;
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
      message: 'El nombre debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 20,
      message: 'El nombre no debe exceder los 20 caracteres',
    },
  }),
  Apellidos: (labelValue: string) => ({
    required: 'El apellido es obligatorio',
    validate: (value: string) => {
      if (labelValue === value) return ERROR_EQUAL_VALUE;
    },
    minLength: {
      value: 3,
      message: 'El apellido debe tener al menos 3 caracteres',
    },
    maxLength: {
      value: 20,
      message: 'El apellido no debe exceder los 20 caracteres',
    },
  }),
  Edad: (labelValue: number) => ({
    required: 'La edad es obligatoria',
    validate: (value: string) => {
      if (labelValue.toString() === value) return ERROR_EQUAL_VALUE;
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
      return true;
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
      if (labelValue.toString() === value) return ERROR_EQUAL_VALUE;
    },
    pattern: {
      value: /^9\d{8}$/,
      message: 'El número de celular debe comenzar con 9 y tener 9 dígitos',
    },
  }),
  Direccion: {
    Departamento: () => ({
      required: 'El departamento es obligatorio',
    }),
    Provincia: () => ({
      required: 'La provincia es obligatoria',
    }),
    Distrito: () => ({
      required: 'El distrito es obligatorio',
    }),
    Domicilio: (subLabelValue: string) => ({
      required: 'El domicilio es obligatorio',
      validate: (value: string) => {
        if (subLabelValue === value) return ERROR_EQUAL_VALUE;
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
