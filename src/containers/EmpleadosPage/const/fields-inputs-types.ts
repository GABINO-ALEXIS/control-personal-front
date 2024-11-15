import { FieldsInputsTypes } from '../types/FieldsInputsTypes';

export const FIELDS_INPUTS_TYPES: FieldsInputsTypes = {
  DNI: {
    type: {
      typeMain: 'input',
    },
  },
  Nombres: {
    type: {
      typeMain: 'input',
    },
  },
  Apellidos: {
    type: {
      typeMain: 'input',
    },
  },
  Edad: {
    type: {
      typeMain: 'input',
      typePropInput: 'number',
    },
  },
  Sexo: {
    type: {
      typeMain: 'select',
    },
    options: {
      itemsArray: [
        { key: 'masculino', label: 'Masculino' },
        { key: 'memenino', label: 'Femenino' },
      ],
    },
  },
  'Fecha de Nacimiento': {
    type: {
      typeMain: 'dateInput',
    },
  },
  Correo: {
    type: {
      typeMain: 'input',
      typePropInput: 'email',
    },
  },
  Celular: {
    type: {
      typeMain: 'input',
    },
  },
  Direccion: {
    Departamento: {
      type: {
        typeMain: 'input',
      },
    },
    Provincia: {
      type: {
        typeMain: 'input',
      },
    },
    Distrito: {
      type: {
        typeMain: 'input',
      },
    },
    Domicilio: {
      type: {
        typeMain: 'input',
      },
    },
  },
} as const;
