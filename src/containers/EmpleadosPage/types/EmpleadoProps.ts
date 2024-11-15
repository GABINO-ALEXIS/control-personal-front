// type EmpleadoInput = {
//   type?: 'input' | 'dateInput';
//   label: string;
//   value: string | number | object;
// };

// type EmpleadoSelect = {
//   type: 'select';
//   label: string;
//   value: string | number | object;
//   options: { key: string; label: string }[];
// };

// export type EmpleadoProps = EmpleadoInput | EmpleadoSelect;
export type EmpleadoProps = {
  label: string;
  value: string | number | object;
};
