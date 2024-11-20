import { ReactNode } from 'react';

type DivInputProps = {
  children: ReactNode;
};

export const DivInput = ({ children }: DivInputProps) => (
  <div className="flex w-full gap-3">{children}</div>
);
