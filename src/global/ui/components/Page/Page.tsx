import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Page = ({ children, className }: Props) => {
  return (
    <div
      className={`flex h-full w-full flex-1 bg-primario px-8 py-7 max-md:p-2 ${className}`}
    >
      {children}
    </div>
  );
};
