import { Input } from '@nextui-org/react';

export type InputCustomProp = {
  type: string;
  label: string;
  defaultValue: string;
};

export default function InputCustom({
  type,
  label,
  defaultValue,
}: InputCustomProp) {
  return (
    <Input
      isRequired
      type={type}
      labelPlacement="outside"
      label={label}
      defaultValue={defaultValue}
      className="max-w-xs"
    />
  );
}
