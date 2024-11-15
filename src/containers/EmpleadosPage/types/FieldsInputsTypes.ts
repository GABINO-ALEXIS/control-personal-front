import { InputType } from './InputType';

type InputOtherType = {
  type: {
    typeMain: InputType['type'];
    typePropInput?: 'text' | 'number' | 'email';
  };
  options?: {
    itemsArray?: {
      key: string;
      label: string;
    }[];
  };
};

export type FieldsInputsTypes = {
  [key: string]: InputOtherType | FieldsInputsTypes;
};
