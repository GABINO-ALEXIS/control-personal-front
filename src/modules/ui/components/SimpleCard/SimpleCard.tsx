import { ReactElement } from 'react';

type SimpleCardProps = {
  icon: ReactElement;
  text: string;
};

export const SimpleCard = ({ icon, text }: SimpleCardProps) => {
  return (
    <div className="relative flex items-center justify-center gap-2 rounded-3xl bg-blanco px-4 py-1 shadow-xl">
      {icon}
      <span>{text}</span>
    </div>
  );
};
