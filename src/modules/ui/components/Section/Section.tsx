import { ReactNode } from 'react';

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export const Section = ({ children, className }: SectionProps) => {
  return (
    <div
      className={`h-max w-full rounded-xl bg-blanco p-4 max-md:p-2 ${className}`}
    >
      {children}
    </div>
  );
};
