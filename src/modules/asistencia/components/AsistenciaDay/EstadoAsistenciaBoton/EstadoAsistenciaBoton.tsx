import { ComponentType, useEffect } from 'react';

type EstadoAsistenciaBotonProps = {
  onClick: () => void;
  icon: ComponentType<{
    className?: string;
  }>;
  estadoText: string;
  className?: string;
  ss?: any;
};

export const EstadoAsistenciaBoton = ({
  onClick,
  icon: Icon,
  estadoText,
  className,
  ss,
}: EstadoAsistenciaBotonProps) => {
  console.log('nn');

  useEffect(() => {
    console.log('kkkkkk');
  }, [ss]);

  return (
    <div
      onClick={onClick}
      className={`flex h-full w-full cursor-pointer flex-wrap items-center gap-1 text-gray-400 max-md:justify-center max-md:gap-0 ${className}`}
    >
      <Icon className="my-3 h-[22px] w-[22px] max-md:my-1" />
      <span>{estadoText}</span>
    </div>
  );
};
