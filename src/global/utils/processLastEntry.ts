import { FormFields } from '../../containers/EmpleadosPage/types/FormFields';

export const processLastEntry = (data: FormFields) => {
  const [key, value] = Object.entries(data)[0];
  const parsedValue =
    value instanceof Date
      ? value
      : typeof value === 'string' && !isNaN(Number(value))
        ? Number(value)
        : value;

  return { [key]: parsedValue };
};
